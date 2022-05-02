import app from "./app.js";

app.listen(app.get('port'));
console.log('El servidor se esta ejecutando en el puerto: ' + app.get('port'));