const express = require('express');

//conectar BD
const conectarDB = require('./config/db');

//crear el servidor
const app = express();

//Conectar BD. ¡NO OLVIDAR REINICIAR EL SERVIDOR CUANDO SE CONECTA POR PRIMERA VEZ!!!
conectarDB();

//puertos de la app; process.env.PORT es de Heroku
const PORT = process.env.PORT || 4000;

//importar rutas. Esto relaciona las URL con respectivos modulos
app.use('/api/usuarios', require('./routes/usuarios')); //api se usa como ruta general

/*//Definir la pagina principal (prueba al principio)
app.get('/',(req,res)=>{
   // res.send('Hola Mundo'); //Para probar q funciona el servidor
});*/

//arrancar la app
app.listen(PORT, ()=>{
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});


