const express = require('express');

//crear el servidor
const app = express();

//puertos de la app; process.env.PORT es de Heroku
const PORT = process.env.PORT || 4000;

//Definir la pagina principal
app.get('/',(req,res)=>{
   // res.send('Hola Mundo'); //Para probar q funciona el servidor
});

//arrancar la app
app.listen(PORT, ()=>{
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});


