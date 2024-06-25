import { BrowserWindow, app } from "electron";
import { registerIpcHandlers } from "../ipc-handlers";
import { createMainWindow } from "./windows";

app.whenReady().then(() => {
  registerIpcHandlers(); // Register all your IPC handlers
  createMainWindow(); // Create the main window

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
