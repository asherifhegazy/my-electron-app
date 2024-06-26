import { contextBridge, ipcRenderer } from "electron";
import type { IpcRendererEvent } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  selectFolder: (folderPath: string) => {
    ipcRenderer.invoke('select-folder', folderPath);
  },
  openFolderDialog: () => ipcRenderer.invoke('open-folder-dialog'),
  onFileContentUpdated: (callback: (event: IpcRendererEvent, data: string) => void) => {
    ipcRenderer.on('file-content-updated', callback);
  },
  stopWatchingFolder: (folderPath: string) => {
    ipcRenderer.invoke('stop-watching-folder', folderPath);
  },
});
