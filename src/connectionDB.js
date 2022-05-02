import mysql from 'mysql';
const connectionDB= mysql.createConnection({
    host : 'localhost',
    port: '3306',
    database : 'storeSublimo',
    user : 'root',
    password : 'sas123',
});

connectionDB.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + connectionDB.threadId);
});

export default connectionDB;