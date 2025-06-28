import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'

import { getDatabaseInstance, closeDatabase } from '../database/database.js';
import { createTableUser } from '../database/dbtables.js'

let db;

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    //autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then( async () => {

// --- AÑADIMOS ESTE MANEJADOR IPC PARA EL MENSAJE DE PRUEBA ---
  ipcMain.on('testMessageChanel', (event, messageContent) => {
    console.log('Mensaje de prueba recibido desde el renderizador:', messageContent);
    // Puedes hacer algo más con el mensaje aquí, como guardarlo en un log o mostrar una notificación
  });

  try {
        db = await getDatabaseInstance(); // Llama a la función asíncrona para inicializar la DB
        console.log("Base de datos inicializada y lista para usar en index.js.");

        // --- Lógica de creación de tablas (si es necesario) ---
        // Si tus funciones createTableX reciben 'db' como argumento, pásalo aquí:
        // createTableUser(db);
           createTableUser(db);
        // createTableProducts(db);
        // ...

        // --- Configuración de tus manejadores IPC (ej. authHandler) ---
        // setupIpcHandlers(ipcMain, db, createAdminWindow); // Descomenta y ajusta si usas esta estructura

    } catch (error) {
        console.error("ERROR CRÍTICO: No se pudo inicializar la base de datos. La aplicación se cerrará.", error);
        app.quit(); // Sale de la aplicación si la DB no se puede inicializar
        return; // Detiene la ejecución posterior
    }

  createWindow()

})

app.on('before-quit', () => {
    console.log("La aplicación está a punto de salir, cerrando la base de datos...");
    if (db) { // Asegúrate de que la DB exista antes de intentar cerrarla
        closeDatabase();
    }
});

export { createWindow }