import path from "node:path";
import { BrowserWindow } from "electron";

export function createMainWindow(): BrowserWindow {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "../preload.js"), // Correct relative path
    },
  });

  mainWindow.loadFile("public/index.html");
  mainWindow.webContents.openDevTools(); // Open DevTools in development

  return mainWindow;
}
