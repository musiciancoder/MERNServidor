//ROUTING

//Rutas para autenticar usuarios
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authController = require('../controllers/authController');


//se llama en POSTMAN con http://localhost:4000/api/auth

//Iniciar sesion
router.post('/',  //argumentos = donde, validacion, respuesta manejada por el conrolador
    [
        //CHEQUEOS ANTES DE ENVIAR (VALIDACION)
      //  Eliminó los dos check siguientes porque React se va encargar de esas validaciones
       // check('email','Agrega un email válido').isEmail(),
       // check('password','El password debe ser minimo de 6 caracteres').isLength({min:6})

    ],

    authController.autenticarUsuario
);

//Obtiene informacion del usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
    )
module.exports = router; //para q este disponible en index.cl
