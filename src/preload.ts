import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  readFile: (filePath: string) => ipcRenderer.invoke("read-file", filePath),
});
