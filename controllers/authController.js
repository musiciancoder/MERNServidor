const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario  = (req,res) => {

    //revisar si hay errores
    const errores = validationResult(req); //obtiene los errores de los check en usuarios.js
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
}
