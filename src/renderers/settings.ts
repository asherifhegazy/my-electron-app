const jsonFolderPathInput = document.getElementById(
  "jsonFolderPath",
) as HTMLInputElement;
const browseJsonFolderButton = document.getElementById(
  "browseJsonFolder",
) as HTMLButtonElement;
const txtFolderPathInput = document.getElementById(
  "txtFolderPath",
) as HTMLInputElement;
const browseTxtFolderButton = document.getElementById(
  "browseTxtFolder",
) as HTMLButtonElement;
const cancelSettingsButton = document.getElementById(
  "cancelSettings",
) as HTMLButtonElement;
const saveSettingsButton = document.getElementById(
  "saveSettings",
) as HTMLButtonElement;

browseJsonFolderButton.addEventListener("click", async (event: Event) => {
  event.preventDefault();
  const folderPath = await window.electronAPI.openFolderDialog();
  if (folderPath) {
    jsonFolderPathInput.value = folderPath;
  }
});

browseTxtFolderButton.addEventListener("click", async (event: Event) => {
  event.preventDefault();
  const folderPath = await window.electronAPI.openFolderDialog();
  if (folderPath) {
    txtFolderPathInput.value = folderPath;
  }
});

// Load and set initial settings (from settings file)
async function loadSettings() {
  try {
    const settings = await window.electronAPI.loadSettings(); // Get settings from main process
    if (settings) {
      jsonFolderPathInput.value = settings.jsonFolderPath || "";
      txtFolderPathInput.value = settings.txtFolderPath || "";
    }
  } catch (err) {
    console.error("Error loading settings:", err);
  }
}

// Save settings to a file
async function saveSettings() {
  const settings = {
    jsonFolderPath: jsonFolderPathInput.value,
    txtFolderPath: txtFolderPathInput.value,
  };
  // Send settings to the main process to be saved
  await window.electronAPI.saveSettings(settings);
}

cancelSettingsButton.addEventListener("click", (event: Event) => {
  event.preventDefault();
  // Close the window without saving
  window.close();
});

saveSettingsButton.addEventListener("click", async (event: Event) => {
  event.preventDefault();
  await saveSettings();
  window.close();
});

// Load initial settings when the window is ready
window.addEventListener("DOMContentLoaded", () => {
  loadSettings();
});
