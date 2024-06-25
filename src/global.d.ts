interface Window {
  electronAPI: {
      readFile: (filePath: string) => Promise<string>;
  };
}