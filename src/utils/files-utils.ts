// src/file-utils.ts
import fs from "node:fs";

export async function readJsonFile<T = unknown>(filePath: string): Promise<T> {
  try {
    const fileContent = await fs.promises.readFile(filePath, "utf-8");
    return JSON.parse(fileContent) as T;
  } catch (err) {
    console.error("Error reading or parsing JSON file:", err);
    throw err; // Consider handling the error more gracefully
  }
}
