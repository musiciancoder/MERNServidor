//LOGEAR USUARIO

const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario  = async (req,res) => {

    //revisar si hay errores (se llama al check del Route)
    const errores = validationResult(req); //obtiene los errores de los check en usuarios.js
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    //extraer el email y password
    const {email,password} = req.body


    try {
        //Revisar q sea un usuario ya registrado
        let usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({ msg: 'El usuario no existe' });
        }

        //Comparar el password que estamos recibiendo del body con el password de la BBDD
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({ msg: 'Password incorrecto' });
        }

        // Si todo es correcto crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id //id del usuario que se está guardando
            }
        };

        // firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600000 // 1 hora
        }, (error, token) => {
            if(error) throw error;

            // Mensaje de confirmación
            // res.json({msg: 'Token creado con exito'});
            res.json({ token });
        });

    } catch (e) {
        console.log(error);
    }


}
