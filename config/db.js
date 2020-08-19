//CONFIGURACION CONEXION BBDD POR MEDIO DE LIBRERIA MONGOOSE

const mongoose = require('mongoose');

//libreria dotenv permite leer las variables de entorno
require('dotenv').config({path: 'variables.env'});

const conectarDB  = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('DB Conectada');
    }catch (error) {
        console.log(error);
        process.exit(1);//Detener la app
    }

}

module.exports  = conectarDB;
