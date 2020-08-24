const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');

//Crea una nueva tarea
exports.crearTarea = async (req, res) => {

    //revisar si hay errores (se llama al check del Route)
    const errores = validationResult(req); //obtiene los errores de los check en usuarios.js
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }
}
