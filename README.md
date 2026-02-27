# Print Screener

A Chrome browser extension for capturing screenshots and recording screencasts directly from the browser.

## Features

- **Screenshot capture** — take a snapshot of the current visible tab
- **Screencast recording** — record video of the current tab using the Chrome Tab Capture API
- **User-defined frame** — select a region of the screen before recording
- **Video editor** — preview and save the recorded video after recording stops

## Tech Stack

- **React 18** + TypeScript
- **Vite** — build tooling with multi-entry support
- **Nanostores** — lightweight state management
- **@dnd-kit** — drag-and-drop for the toolbar
- **SCSS Modules** — component-scoped styles
- **Chrome Extensions Manifest V3**

### Prerequisites

- Node.js 18+
- npm or any compatible package manager
- Google Chrome 116+

### Install dependencies

```bash
npm install
```

### Development

```bash
npm start
```

Watches for changes and rebuilds automatically via `nodemon`.

### Production build

```bash
npm run build
```

Output is placed in the `dist/` folder.

## Permissions

The extension requires the following Chrome permissions:

| Permission       | Purpose                                    |
| ---------------- | ------------------------------------------ |
| `activeTab`      | Access the current tab                     |
| `tabs`           | Query tab information                      |
| `tabCapture`     | Capture tab media stream for recording     |
| `desktopCapture` | Desktop/tab capture support                |
| `offscreen`      | Run MediaRecorder in an offscreen document |
| `pageCapture`    | Capture visible tab as image               |
| `storage`        | Persist toolbar state                      |

## How It Works

1. Click the extension icon to open the popup.
2. Click **Show toolbar** to inject the floating toolbar into the current page.
3. Drag the toolbar to reposition it anywhere on the page.
4. Click **Start** to begin recording the tab (you may define a frame area first).
5. Click **Stop** to end the recording.
6. The video editor opens automatically — preview and save the recording.

Alternatively, use **Take a picture** in the popup to capture an instant screenshot.

## License

MIT
