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
    res.send("Chale");
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

export default app;
