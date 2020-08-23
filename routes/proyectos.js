const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');

//Crea proyectos
//api/proyectos
router.post('/', //se prueba en Postman
    auth,  //Este es un middleare (se ejecuta antes de llegar al controlador) Archivo middleware/auth.js. Verifica que en el header vaya x-auth-token


/*

    [
        check('nombre', 'El nombre del proyecto es obligatoio').not().isEmpty()
    ],*/
    proyectoController.crearProyecto
    );

router.get('/', //se prueba en browser con http://localhost:4000/api/proyectos
    auth,
    proyectoController.crearProyecto
    )

module.exports = router;
