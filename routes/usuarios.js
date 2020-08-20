//ROUTING

//Rutas para crear usuarios

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const {check} = require('express-validator');

//Crea un usuario
//api/usuarios es la URL general configurada en index


//se llama en POSTMAN con http://localhost:4000/api/usuarios


router.post('/',
    [
        //CHEQUEOS ANTES DE ENVIAR (VALIDACION)
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email','Agrega un email válido').isEmail(),
        check('password','El password debe ser minimo de 6 caracteres').isLength({min:6})

    ],
    usuarioController.crearUsuario
);

module.exports = router; //para q este disponible en index.cl
