const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {

 
  salvarTransacao: async (dados) => {
    const response = await fetch('http://localhost:3000/transacoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    return response.json();
  },

 
  listarTransacoes: async (usuario_id) => {
    const response = await fetch(`http://localhost:3000/transacoes/${usuario_id}`);
    return response.json();
  }

});