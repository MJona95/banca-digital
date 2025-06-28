// database/database.js

import { app } from 'electron';
import sqlite3_module from 'sqlite3';
import path from 'path';
import fs from 'fs';

const sqlite3 = sqlite3_module.verbose();
let dbInstance = null;

/**
 * Inicializa la base de datos y devuelve su instancia.
 * Debe llamarse DESPUÉS de app.whenReady().
 */
export async function getDatabaseInstance() {
    if (dbInstance) {
        console.log("DB ya inicializada.");
        return dbInstance;
    }

    if (!app.isReady()) {
        console.error("ERROR: app no está lista para DB. Llama desde app.whenReady().");
        throw new Error("Electron app no lista para DB.");
    }

    const appData = app.getPath('appData');
    const appName = app.name || 'Inventario_Maquinaria_App'; // Usa app.name o un fallback
    const appDirectory = path.join(appData, appName);
    const dbPath = path.join(appDirectory, 'mydatabase.db');

    console.log(`DB path: ${dbPath}`);

    if (!fs.existsSync(appDirectory)) {
        console.log(`Creando directorio: ${appDirectory}`);
        try {
            fs.mkdirSync(appDirectory, { recursive: true });
            console.log("Directorio DB creado.");
        } catch (error) {
            console.error(`Error creando directorio DB ${appDirectory}:`, error.message);
            throw error;
        }
    }

    return new Promise((resolve, reject) => {
        dbInstance = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Error DB Connect:', err.message);
                reject(err);
            } else {
                console.log('DB Conectada.');
                resolve(dbInstance);
            }
        });
    });
}

/**
 * Cierra la conexión a la base de datos.
 * Llama en app.on('before-quit').
 */
export function closeDatabase() {
    if (dbInstance) {
        dbInstance.close((err) => {
            if (err) {
                console.error('Error DB Close:', err.message);
            } else {
                console.log('DB Cerrada.');
                dbInstance = null;
            }
        });
    }
}