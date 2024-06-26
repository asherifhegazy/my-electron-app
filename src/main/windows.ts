import path from "node:path";
import { BrowserWindow } from "electron";

export class WindowManager {
  private mainWindow: BrowserWindow | null = null;

  getMainWindow(): BrowserWindow | null {
    return this.mainWindow;
  }
  
  createMainWindow(): BrowserWindow {
    this.mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, "../preload.js"),
      },
    });

    this.mainWindow.loadFile("public/index.html");
    this.mainWindow.webContents.openDevTools();

    return this.mainWindow;
  }

  // Add more window creation/management methods here as needed
  // createSettingsWindow(): BrowserWindow { ... }
  // getFocusedWindow(): BrowserWindow | null { ... }
  // and so on...
}
