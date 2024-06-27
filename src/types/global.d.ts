import { Settings } from "./settings";

declare global {
  interface Window {
    electronAPI: {
      selectFolder: (folderPath: string) => void;
      openFolderDialog: () => Promise<string>;
      onFileContentUpdated: (
        callback: (event: IpcRendererEvent, data: string) => void,
      ) => void;
      stopWatchingFolder: (folderPath: string) => void;
      saveSettings: (settings: Settings) => void;
      loadSettings: () => Promise<Settings>;
    };
  }
}
