import express from "express";
import connectionDB from "./connectionDB.js";

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

export default app;
