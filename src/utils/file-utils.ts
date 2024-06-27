import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as chokidar from "chokidar";
import { app } from "electron/main";

export class FileManager {
  private watchers: Map<string, chokidar.FSWatcher> = new Map();

  async readJsonFile(filePath: string): Promise<object | object[]> {
    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      return JSON.parse(fileContent);
    } catch (err) {
      console.error(`Error reading or parsing JSON file: ${filePath}`, err);
      // throw err; // Consider more graceful error handling
      return {};
    }
  }

  async readAndWatchFolder(
    folderPath: string,
    onFileChange: (filePath: string, eventType: string) => void,
  ): Promise<void> {
    if (this.watchers.has(folderPath)) {
      console.warn(`Folder ${folderPath} is already being watched.`);
      return;
    }

    // Normalize the folderPath before watching
    const normalizedFolderPath = path.normalize(folderPath);
    const watcher = chokidar
      .watch(normalizedFolderPath, { depth: 0 })
      .on("all", (eventType, filePath: string) => {
        // Use 'all' event
        // Normalize filePath as well
        const normalizedFilePath = path.normalize(filePath);
        if (path.extname(normalizedFilePath) === ".json") {
          onFileChange(filePath, eventType); // Call only for .json files
        }
      });

    this.watchers.set(folderPath, watcher);

    // --- Read Existing JSON Files ---
    try {
      const files = await fs.readdir(normalizedFolderPath);
      for (const file of files) {
        const fullPath = path.join(normalizedFolderPath, file);
        if (path.extname(fullPath) === ".json") {
          onFileChange(fullPath, "initial"); // Use a custom eventType
        }
      }
    } catch (err) {
      console.error(`Error reading directory: ${normalizedFolderPath}`, err);
      // Handle the error appropriately (e.g., send an error to the renderer)
    }
  }

  stopWatchingFolder(folderPath: string): void {
    const watcher = this.watchers.get(folderPath);
    if (watcher) {
      watcher.close();
      this.watchers.delete(folderPath);
    }
  }

  async saveJsonFileToUserData(
    jsonObject: object,
    fileName: string,
  ): Promise<void> {
    try {
      const jsonFilePath = path.join(
        app.getPath("userData"),
        `${fileName}.json`,
      ); // Store in userData directory
      await fs.writeFile(jsonFilePath, JSON.stringify(jsonObject, null, 2));
    } catch (err) {
      console.error("Error saving jsonFile:", err);
      // Potentially show an error dialog to the user
    }
  }

  async loadUserDataFromFile(fileName: string): Promise<object | null> {
    // Returns settings or undefined
    try {
      const userDataFilePath = path.join(
        app.getPath("userData"),
        `${fileName}.json`,
      );
      return this.readJsonFile(userDataFilePath);
    } catch (err) {
      // If the settings file doesn't exist, return undefined (or handle differently)
      return null;
    }
  }
}
