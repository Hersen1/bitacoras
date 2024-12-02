const { contextBridge, ipcRenderer } = require('electron');

// Exponer métodos al renderizador
contextBridge.exposeInMainWorld('api', {
    send: (channel, data) => ipcRenderer.send(channel, data),
    receive: (channel, func) => ipcRenderer.on(channel, func)
});
