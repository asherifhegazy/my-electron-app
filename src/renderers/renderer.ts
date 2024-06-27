const folderInput = document.getElementById("folderInput") as HTMLInputElement;
const folderSelectionStatus = document.getElementById("folderSelectionStatus");
const jsonContent = document.getElementById(
  "jsonContent",
) as HTMLTextAreaElement;

let jsonData: object = {};

folderInput.addEventListener("click", async (event: Event) => {
  event.preventDefault();
  const folderPath = await window.electronAPI.openFolderDialog();
  if (folderPath) {
    if (folderSelectionStatus) {
      folderSelectionStatus.textContent = `Selected folder: ${folderPath}`;
    }
    window.electronAPI.selectFolder(folderPath);
  }
});

window.electronAPI.onFileContentUpdated((event: Event, newJsonData: string) => {
  try {
    const parsedData = JSON.parse(newJsonData);
    jsonData = { ...jsonData, ...parsedData }; // Merge with existing data (example)
    jsonContent.value = JSON.stringify(jsonData, null, 2);
  } catch (err) {
    console.error("Error updating content:", err);
    jsonContent.value = `ERROOOOOOOOOOOOOOOOOOOOOOOOOR, \n\n\n ${err}`;
  }
});
