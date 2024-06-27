import path from "node:path";
import { BrowserWindow, screen } from "electron";

export class WindowManager {
  private mainWindow: BrowserWindow | null = null;
  private settingsWindow: BrowserWindow | null = null;

  getMainWindow(): BrowserWindow | null {
    return this.mainWindow;
  }

  getSettingsWindow(): BrowserWindow | null {
    return this.settingsWindow;
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

    this.mainWindow.loadFile(path.join(__dirname, "../views/index.html"));

    this.mainWindow.webContents.openDevTools();

    return this.mainWindow;
  }

  createSettingsWindow(): void {
    if (this.settingsWindow) {
      this.settingsWindow.focus();
      return;
    }

    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;

    this.settingsWindow = new BrowserWindow({
      width: 600,
      height: 400,
      x: Math.floor(width * 0.3),
      y: Math.floor(height * 0.3),
      title: "Settings",
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, "../preload.js"),
      },
    });

    this.settingsWindow.loadFile(
      path.join(__dirname, "../views/settings.html"),
    );
    this.settingsWindow.webContents.openDevTools();

    this.settingsWindow.on("closed", () => {
      this.settingsWindow = null;
    });
  }

  // Add more window creation/management methods here as needed
  // createSettingsWindow(): BrowserWindow { ... }
  // getFocusedWindow(): BrowserWindow | null { ... }
  // and so on...
}
