const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//Crea proyectos
//api/proyectos
router.post('/', //se prueba en Postman
    auth,  //Este es un middleare (se ejecuta antes de llegar al controlador) Archivo middleware/auth.js. Verifica que en el header vaya x-auth-toke
    [
        check('nombre', 'El nombre del proyecto es obligatoio').not().isEmpty()
    ],
    proyectoController.crearProyecto
    );

//Obtener todoas los proyectos por usuario
router.get('/', //se prueba en browser con http://localhost:4000/api/proyectos
    auth,
    proyectoController.obtenerProyectos
    )

//Actualizar un proyecto via ID
router.put('/:id',
    auth,  //Este es un middleare (se ejecuta antes de llegar al controlador) Archivo middleware/auth.js. Verifica que en el header vaya x-auth-token
    [
        check('nombre', 'El nombre del proyecto es obligatoio').not().isEmpty()
    ],

    proyectoController.actualizarProyecto
    );


module.exports = router;
