import express from "express";
import connectionDB from "./connectionDB.js";
//import * as queryDB from "./queryDB.js";

//initialization
const app = express();

//configuration
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//rutes
app.get('/', (req,res) =>{
    res.send("API SubliMO");
});

app.get('/productos', (req,res) => {
    connectionDB.query('SELECT * FROM productos', function (err, datos, fields) {
        if (err)
            throw err;
        res.json(datos);
    });
});

app.get('/usuarios', (req,res) => {
    connectionDB.query('SELECT * FROM usuarios', function (err, datos, fields) {
        if (err)
            throw err;
        res.json(datos);
    });
});

app.post('/productos',(req,res) => {
    const productReceived = req.body;
    if(!productReceived || Object.keys(productReceived[0]).length < 4){
        return res.status(400).json({
            ok: false,
            message: 'Faltan Parametros'
        });
    }
    connectionDB.query('INSERT INTO productos SET?', productReceived, function (err) {
        if (err)
            throw err;
    });
    res.status(200).json({
        ok: true,
        message: 'Datos guardados correctamente',
    });
});

app.post('/usuarios',(req,res) => {
    const productReceived = req.body;
    if(!productReceived || Object.keys(productReceived[0]).length < 3){
        return res.status(400).json({
            ok: false,
            message: 'Faltan Parametros'
        });
    }
    connectionDB.query('INSERT INTO usuarios SET?', productReceived, function (err) {
        if (err)
            throw err;
    });
    res.status(200).json({
        ok: true,
        message: 'Datos guardados correctamente',
    });
});

app.get('/usuarios/:Correo', (req,res) => {
    const {Correo} = req.params;
    connectionDB.query('SELECT * FROM usuarios WHERE Correo = ?', [Correo], (err, datos, fields) => {
        if(!err){
            res.json(datos);
        } else{
            res.status(400).json({
                ok: false,
                message: 'El usuario no se encontro en la base de datos',
            });
            console.log(err);
        }
    });

});

app.get('/carrito/:idUsuario', (req,res) => {
    const {idUsuario} = req.params;
    connectionDB.query('SELECT * FROM carrito WHERE idUsuario = ?', [idUsuario], (err, datos, fields) => {
        if(!err){
            res.json(datos);
        } else{
            res.status(400).json({
                ok: false,
                message: 'El idUsuario no se encontro en la base de datos',
            });
            console.log(err);
        }
    });
});

app.post('/carrito', (req,res) => {
    const addCarrito = req.body;
    if(!addCarrito || Object.keys(addCarrito[0]).length < 2){
        return res.status(400).json({
            ok: false,
            message: 'Faltan Parametros'
        });
    }
    connectionDB.query('INSERT INTO carrito SET?', addCarrito, function (err) {
        if (err)
            throw err;
    });
    res.status(200).json({
        ok: true,
        message: 'Datos guardados correctamente',
    });
});

app.delete('/carrito/:idCarrito',(req,res) => {
    const {idCarrito} = req.params;
    connectionDB.query('DELETE FROM carrito WHERE idCarrito = ?', [idCarrito], (err, datos, fields) => {
        if(!err){
            res.status(500).json({
                ok: true,
                message: 'Producto eliminado del carrito',
            });
        } else{
            res.status(400).json({
                ok: false,
                message: 'El producto no se encontro en la base de datos',
            });
            console.log(err);
        }
    });
});

export default app;
