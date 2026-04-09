const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  mudarTela: (tela) => ipcRenderer.send('mudar-tela', tela)
});