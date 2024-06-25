import fs from "node:fs";
import path from "node:path";
import { BrowserWindow, app, ipcMain } from "electron";

async function handleReadFile(
	event: Electron.IpcMainInvokeEvent,
	filePath: string,
) {
	try {
		return fs.promises.readFile(filePath, "utf-8");
	} catch (err) {
		console.error("Error reading file:", err);
		throw err; // Propagate the error to the renderer
	}
}

const createWindow = () => {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.join(__dirname, "preload.js"),
		},
	});

	mainWindow.loadFile("public/index.html");

	// Open DevTools in development mode
	mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
	ipcMain.handle("read-file", handleReadFile);
	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});
