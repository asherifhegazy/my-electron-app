const fileInput = document.getElementById("fileInput") as HTMLInputElement;
const jsonContent = document.getElementById(
  "jsonContent",
) as HTMLTextAreaElement;

fileInput.addEventListener("change", async (event: Event) => {
  const target = event.target as HTMLInputElement; // Cast to HTMLInputElement
  const file = target.files?.[0];
  if (file) {
    try {
      const jsonData = await window.electronAPI.readJsonFile(file.path);
      jsonContent.value = JSON.stringify(jsonData, null, 2);
    } catch (error) {
      jsonContent.value = "Error reading or parsing file!";
      console.error(error);
    }
  }
});
