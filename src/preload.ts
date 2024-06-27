import { IpcRendererEvent, contextBridge, ipcRenderer } from "electron";
import { Settings } from "./types/settings";

contextBridge.exposeInMainWorld("electronAPI", {
  selectFolder: (folderPath: string) => {
    ipcRenderer.invoke("select-folder", folderPath);
  },
  openFolderDialog: () => ipcRenderer.invoke("open-folder-dialog"),
  onFileContentUpdated: (
    callback: (event: IpcRendererEvent, data: string) => void,
  ) => {
    ipcRenderer.on("file-content-updated", callback);
  },
  stopWatchingFolder: (folderPath: string) => {
    ipcRenderer.invoke("stop-watching-folder", folderPath);
  },
  saveSettings: (settings: Settings) =>
    ipcRenderer.invoke("save-settings", settings),
  loadSettings: () => ipcRenderer.invoke("load-settings"),
});
