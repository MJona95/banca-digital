   
/**
 * Crea la tabla de usuarios si no existe.
 */
function createTableUser(db) {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS User (
            idUser INTEGER PRIMARY KEY AUTOINCREMENT,
            Name TEXT NOT NULL UNIQUE,
            Password TEXT NOT NULL,
            Type TEXT NOT NULL
        )
    `;

    const insertAdminQuery = `
        INSERT OR IGNORE INTO User (Name, Password, Type)
        VALUES (?, ?, ?)
    `;

    db.run(createTableQuery, (err) => {
        if (err) {
            console.error('Error al crear la tabla "User":', err);
        } else {
            console.log('Tabla "User" lista.');
            db.run(insertAdminQuery, ['admin', 'del1al3', 'admin'], (insertErr) => {
                if (insertErr) {
                    console.error('Error al insertar usuario admin:', insertErr);
                } else {
                    console.log('Usuario "admin" verificado/insertado.');
                }
            });
        }
    });
}

export { createTableUser }; 