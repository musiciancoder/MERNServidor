//Rutas para crear usuarios

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

//Crea un usuario
//api/usuarios es la URL general configurada en index


//se llama en POSTMAN con http://localhost:4000/api/usuarios


router.post('/',
    usuarioController.crearUsuario
);

module.exports = router; //para q este disponible en index.cl
