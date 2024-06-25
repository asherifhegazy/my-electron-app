// src/file-utils.ts
import fs from "node:fs";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class FileUtils {
  static async readJsonFile<T = unknown>(filePath: string): Promise<T> {
    try {
      const fileContent = await fs.promises.readFile(filePath, "utf-8");
      return JSON.parse(fileContent) as T;
    } catch (err) {
      console.error("Error reading or parsing JSON file:", err);
      throw err; // Consider handling the error more gracefully
    }
  }

  // Add more file-related utility methods as needed...
  // static async writeTextFile(filePath: string, data: string): Promise<void> { ... }
}
