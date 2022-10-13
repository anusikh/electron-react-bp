const { app, BrowserWindow, ipcMain, desktopCapturer } = require("electron");
const path = require("path");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let window = null;

const createWindow = () => {
  // Here, we are grabbing the React url from the env (which is on the start script)
  const startUrl = process.env.ELECTRON_START_URL;
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      // Necessary because by default its true in latest versions of electron
      contextIsolation: false,
    },
  });
  // And loading it in the window
  window.loadURL(startUrl);
  window.show();
  window.webContents.openDevTools({ mode: "detach" });
};

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Recieve Get Data Event from React code (renderer)
ipcMain.on("GET_DATA", async (event, arg) => {
  const x = await desktopCapturer.getSources({
    types: ["window", "screen"],
  });
  console.log(x);
});
