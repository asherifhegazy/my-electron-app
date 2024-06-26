import { dialog, ipcMain } from "electron";
import type { FileManager } from "./utils/file-utils";
import type { WindowManager } from "./main/windows";

export class IpcHandler {
  private fileManager: FileManager;
  private windowManager: WindowManager;

  constructor(fileManager: FileManager, windowManager: WindowManager) {
    this.fileManager = fileManager;
    this.windowManager = windowManager;
    this.registerHandlers();
  }

  private registerHandlers(): void {
    ipcMain.handle('select-folder', (_, folderPath: string) => this.handleSelectFolder(folderPath));
    ipcMain.handle('stop-watching-folder', (_, folderPath: string) => this.handleStopWatchingFolder(folderPath));
    ipcMain.handle('open-folder-dialog', () => this.handleOpenFolderDialog());
    // Add more handlers as needed...
  }

  private async handleOpenFolderDialog(): Promise<string> {
    {
      const result = await dialog.showOpenDialog({
        properties: ['openDirectory']
      });
      return result.filePaths[0] || "";
    }
  }

  private async handleSelectFolder(folderPath: string): Promise<void> {
    await this.fileManager.watchFolder(folderPath, async (filePath, eventType) => {
      if ((eventType === 'add' || eventType === 'change')) {
        try {
          const jsonData = await this.fileManager.readJsonFile(filePath);
          const mainWindow = this.windowManager.getMainWindow(); // Get the focused window
          if (mainWindow) { // Check if the window exists
            mainWindow.webContents.send('file-content-updated', JSON.stringify(jsonData, null, 2));
          }
        } catch (err) {
          console.error(`Error handling file change: ${filePath}`, err);
          // Send an error message to the renderer if needed
        }
      }
      // else if (eventType === 'unlink') {
      // Handle file deletion if required 
      //}
    });
  }

  private handleStopWatchingFolder(folderPath: string): void {
    this.fileManager.stopWatchingFolder(folderPath);
  }

  // Add more handler methods (private or public as needed)
  // private handleOtherEvent(...): void { ... }
  // public somePublicMethod(...): void { ... }
}
