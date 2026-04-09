const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  mudarTela: (tela) => ipcRenderer.send('mudar-tela', tela),

  // APIs do backend (transações)
  salvarTransacao: async (dados) => {
    const res = await fetch('http://localhost:3000/transacoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    return res.json();
  },

  listarTransacoes: async (usuario_id) => {
    const res = await fetch(`http://localhost:3000/transacoes/${usuario_id}`);
    return res.json();
  }
});