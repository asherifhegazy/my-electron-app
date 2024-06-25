import path from "node:path";
// src/main/windows.ts
import { BrowserWindow } from "electron";

export class WindowManager {
  createMainWindow(): BrowserWindow {
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, "../preload.js"),
      },
    });

    mainWindow.loadFile("public/index.html");
    mainWindow.webContents.openDevTools();

    return mainWindow;
  }

  // Add more window creation/management methods here as needed
  // createSettingsWindow(): BrowserWindow { ... }
  // getFocusedWindow(): BrowserWindow | null { ... }
  // and so on...
}
