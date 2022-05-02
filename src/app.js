import express from "express";

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

export default app;
