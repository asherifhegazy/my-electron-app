import { ipcMain } from "electron";
import { FileUtils } from "./utils/file-utils";

export class IpcHandler {
  constructor() {
    this.registerHandlers(); // Automatically register handlers upon creation
  }

  private registerHandlers(): void {
    ipcMain.handle("read-json-file", (_, filePath: string) =>
      FileUtils.readJsonFile(filePath),
    );
    // Add more handlers as needed...
  }

  // Add more handler methods (private or public as needed)
  // private handleOtherEvent(...): void { ... }
  // public somePublicMethod(...): void { ... }
}
