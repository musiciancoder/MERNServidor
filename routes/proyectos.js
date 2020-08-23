const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');


//Crea proyectos
//api/proyectos
router.post('/',
   /* auth,
    [
        check('nombre', 'El nombre del proyecto es obligatoio').not().isEmpty()
    ],*/
    proyectoController.crearProyecto
    );

module.exports = router;
