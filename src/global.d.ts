interface Window {
  electronAPI: {
    selectFolder: (folderPath: string) => void;
    openFolderDialog: () => Promise<string>;
    onFileContentUpdated: (callback: (event: IpcRendererEvent, data: string) => void) => void;
    stopWatchingFolder: (folderPath: string) => void;
  };
}
