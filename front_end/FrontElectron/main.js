const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win; 

function createWindow() {
  win = new BrowserWindow({ 
    width: 900,
    height: 800,
    icon: path.join(__dirname, 'img/logo.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, 'src/login/index.html'));
}

app.whenReady().then(createWindow);


ipcMain.on('mudar-tela', (event, tela) => {
  win.loadFile(path.join(__dirname, `src/${tela}/index.html`));
});