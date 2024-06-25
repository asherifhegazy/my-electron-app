import { ipcMain } from "electron";
import { readJsonFile } from "./utils/files-utils";

export function registerIpcHandlers() {
  ipcMain.handle("read-file", (_, filePath: string) => readJsonFile(filePath));
  // You'll add more handlers here in the future
}
