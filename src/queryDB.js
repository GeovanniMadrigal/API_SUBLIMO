import connectionDB from "./connectionDB.js";

function mostrarProductos(){
    connectionDB.query('SELECT * FROM productos', function (err, datos, fields) {
        if (err)
            throw err;
        console.log(datos);
        return datos;
    });
}

export {mostrarProductos};