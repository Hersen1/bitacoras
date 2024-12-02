// Importar los módulos necesarios de Electron
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Función para crear la ventana principal de la aplicación
let mainWindow;

function createWindow() {
    // Crear una nueva ventana de navegador
    mainWindow = new BrowserWindow({
        width: 1024, // Ancho de la ventana
        height: 768, // Alto de la ventana
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Si usas preload.js, puedes agregarlo aquí
            nodeIntegration: true, // Habilitar nodeIntegration para usar Node.js en el renderizador
        }
    });

    // Cargar el archivo HTML principal
    mainWindow.loadFile('index.html');

    // Abrir las herramientas de desarrollo (opcional)
    // mainWindow.webContents.openDevTools();

    // Evento cuando la ventana es cerrada
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Esta función se ejecuta cuando la aplicación está lista
app.whenReady().then(() => {
    createWindow();

    // En caso de que haya otras ventanas abiertas, asegúrate de cerrar correctamente al salir de la aplicación
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Salir cuando todas las ventanas estén cerradas (en sistemas operativos como Windows)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Código para manejar la selección del formulario en el HTML
// Aquí lo que hacemos es escuchar el evento de selección de la lista desplegable
// y cargar el formulario correspondiente dinámicamente.
ipcMain.on('load-form', (event, formType) => {
    // Enviar el formulario correspondiente a la ventana principal
    if (formType === 'registro_emergencias') {
        // Aquí enviarías el HTML correspondiente para el formulario de registro de emergencias
        // Por ejemplo, puedes cargar dinámicamente el formulario de emergencias desde un archivo HTML
        mainWindow.webContents.send('show-form', 'form-registro-emergencia');
    } else if (formType === 'otra_opcion') {
        // Aquí manejarías otra opción, si fuera el caso
    }
});
