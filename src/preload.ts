import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  readJsonFile: (filePath: string) => ipcRenderer.invoke("read-json-file", filePath),
});
