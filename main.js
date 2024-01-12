/**
 * General setup for the electron app.
 * In order to be able to use imports in index.js in index.html, put: type="module" in the script tag:
 * <script type="module" src="index.js"></script>!
 */
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const htmlFileToLoad = 'index.html';
let win;


/**
 * If true: opens dev tools.
 */
const openDevTools = false;


/**
 * Create the main window.
 * Load the index.html file.
 * @returns {void}
 */
function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
    });

    win.loadURL(url.format({
        pathname: path.join(__dirname, htmlFileToLoad),
        protocol: 'file',
        slashes: true
    }));

    if(openDevTools) {
        win.webContents.openDevTools();
    }

    win.on('closed', () => {
        win = null;
    });
}


/**
 * Create the main window when the app is ready.
 * Quit the app when all windows are closed.
 */
app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
