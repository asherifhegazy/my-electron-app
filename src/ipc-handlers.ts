import { dialog, ipcMain } from "electron";
import { WindowManager } from "./main/windows";
import { Settings } from "./types/settings";
import { FileManager } from "./utils/file-utils";

export class IpcHandler {
  private fileManager: FileManager;
  private windowManager: WindowManager;

  constructor(fileManager: FileManager, windowManager: WindowManager) {
    this.fileManager = fileManager;
    this.windowManager = windowManager;
    this.registerHandlers();
  }

  private registerHandlers(): void {
    ipcMain.handle("select-folder", (_, folderPath: string) =>
      this.handleSelectFolder(folderPath),
    );
    ipcMain.handle("stop-watching-folder", (_, folderPath: string) =>
      this.handleStopWatchingFolder(folderPath),
    );
    ipcMain.handle("open-folder-dialog", () => this.handleOpenFolderDialog());
    ipcMain.handle("save-settings", (_, settings: Settings) =>
      this.handleSaveSettings(settings),
    );
    ipcMain.handle("load-settings", () => this.handleLoadSettings());
    // Add more handlers as needed...
  }

  private async handleLoadSettings(): Promise<Settings | null> {
    // Returns settings or undefined
    try {
      const settings = await this.fileManager.loadUserDataFromFile("settings");
      return settings as Settings;
    } catch (err) {
      // If the settings file doesn't exist, return undefined (or handle differently)
      return null;
    }
  }

  private async handleSaveSettings(settings: Settings): Promise<void> {
    try {
      await this.fileManager.saveJsonFileToUserData(settings, "settings");
    } catch (err) {
      console.error("Error saving settings:", err);
      // Potentially show an error dialog to the user
    }
  }

  private async handleOpenFolderDialog(): Promise<string> {
    {
      const result = await dialog.showOpenDialog({
        properties: ["openDirectory"],
      });
      return result.filePaths[0] || "";
    }
  }

  private async handleSelectFolder(folderPath: string): Promise<void> {
    await this.fileManager.readAndWatchFolder(
      folderPath,
      async (filePath, eventType) => {
        if (eventType === "add" || eventType === "change") {
          try {
            const jsonData = await this.fileManager.readJsonFile(filePath);
            const mainWindow = this.windowManager.getMainWindow(); // Get the focused window
            if (mainWindow) {
              // Check if the window exists
              mainWindow.webContents.send(
                "file-content-updated",
                JSON.stringify(jsonData, null, 2),
              );
            }
          } catch (err) {
            console.error(`Error handling file change: ${filePath}`, err);
            // Send an error message to the renderer if needed
          }
        }
        // else if (eventType === 'unlink') {
        // Handle file deletion if required
        //}
      },
    );
  }

  private handleStopWatchingFolder(folderPath: string): void {
    this.fileManager.stopWatchingFolder(folderPath);
  }

  // Add more handler methods (private or public as needed)
  // private handleOtherEvent(...): void { ... }
  // public somePublicMethod(...): void { ... }
}
