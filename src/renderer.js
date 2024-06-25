const fileInput = document.getElementById("fileInput");
const jsonContent = document.getElementById("jsonContent");

fileInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (file) {
        try {
            // Use the exposed 'readFile' function from preload.js
            const fileContent = await window.electronAPI.readFile(file.path);
            const jsonData = JSON.parse(fileContent);
            jsonContent.value = JSON.stringify(jsonData, null, 2);
        } catch (error) {
            jsonContent.value = "Error reading or parsing file!";
            console.error(error);
        }
    }
});
