import { Menu, MenuItem, MenuItemConstructorOptions } from "electron";
import { WindowManager } from "../main/windows";

export class MenuManager {
  private windowManager: WindowManager;

  constructor(windowManager: WindowManager) {
    this.windowManager = windowManager;
    this.loadMenus();
  }

  loadMenus() {
    this.createAppMenu();
  }

  createAppMenu() {
    const template: (MenuItemConstructorOptions | MenuItem)[] = [
      {
        label: "File",
        submenu: [
          {
            label: "Settings",
            click: () => {
              this.windowManager.createSettingsWindow();
            },
          },
          // ... other menu items ...
        ],
      },
      // ... other menu categories ...
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }
}
