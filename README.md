# My Electron App

## Overview

This is a simple Electron application designed to read and display JSON files. The application uses TypeScript and Electron Forge for building and packaging.

## Features

- Select and read JSON files from the local filesystem.
- Display the content of the JSON files in a formatted manner.
- Uses Electron's IPC (Inter-Process Communication) to handle file reading in the main process.

## Project Structure
my-electron-app/

├── src/

│   ├── main/

│   │   ├── main.ts

│   │   ├── windows.ts

│   ├── utils/

│   │   └── file-utils.ts

│   ├── ipc-handlers.ts

│   ├── preload.ts

│   ├── renderer.ts

│   └── global.d.ts

├── public/

│   └── index.html

├── .vscode/

│   └── launch.json

├── .gitignore

├── biome.json

├── forge.config.js

├── package.json

├── tsconfig.json

├── README.md

└── LICENSE


## Getting Started

### Prerequisites

- Node.js (v20 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```sh
git clone https://github.com/asherifhegazy/my-electron-app.git
```
```
cd my-electron-app
```

2. Install dependencies:
```sh
npm install
```
# or
```sh
yarn install
```

### Building the Application

To package the application, run:
```sh
npm run make
```
# or
```sh
yarn make
```

## Development

### File Structure

- **Main Process**: The main process code is located in `src/main/`. This includes the main entry point (`main.ts`) and window management (`windows.ts`).
- **Renderer Process**: The renderer process code is located in `src/renderer.ts`.
- **IPC Handlers**: IPC handlers are defined in `src/ipc-handlers.ts`.
- **Utilities**: Utility functions, such as file reading, are located in `src/utils/file-utils.ts`.
- **Preload Script**: The preload script is located in `src/preload.ts` and exposes APIs to the renderer process.

### IPC Communication

The main process handles file reading through IPC. The renderer process sends a request to read a file, and the main process responds with the file content.


### Configuration

- **TypeScript Configuration**: The TypeScript configuration is defined in `tsconfig.json`.
- **Electron Forge Configuration**: The Electron Forge configuration is defined in `forge.config.js`.
- **Biome Configuration**: The Biome configuration is defined in `biome.json`.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## Author

Ahmed Sherif