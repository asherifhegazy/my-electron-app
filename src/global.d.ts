interface Window {
  electronAPI: {
    readJsonFile: (filePath: string) => Promise<string>;
  };
}
