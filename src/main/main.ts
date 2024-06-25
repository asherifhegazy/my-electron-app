import { BrowserWindow, app } from "electron";
import { IpcHandler } from "../ipc-handlers";
import { WindowManager } from "./windows";

const windowManager = new WindowManager(); // Create an instance of WindowManager
const ipcHandler = new IpcHandler(); // Create an instance of IpcHandler and register all handlers

app.whenReady().then(() => {
  windowManager.createMainWindow(); // Create the main window

  /**
   * This code snippet ensures that on macOS,
   * when the user activates your app (by clicking the Dock icon or launching it),
   * a main window is created if one doesn't already exist,
   * providing the expected macOS app behavior.
   */
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0)
      windowManager.createMainWindow();
  });
});

/**
 * This code snippet is crucial for providing a consistent user experience:
 * 1- Windows & Linux: Quitting the app when all windows are closed.
 * 2- macOS: Keeping the app running in the background when all windows are closed,
 * allowing it to be reactivated from the Dock.
 */
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
