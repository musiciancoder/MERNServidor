const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');


//Con esto podemos insertar usuarios en el compass de Mongo. Lo prueba enviando el usuario {
//    "nombre":"juan",
//     "email":"correo@gmail.com",
//     "password":123
// }   por postman
exports.crearUsuario = async (req, res) => {
    //  console.log('desde crearUsuario');
    //Para probar en Postman con http://localhost:4000/api/usuarios siempre se hace con  console.log(req.body); en los Headers de Postman ademas se debe escribir Content-Type appilcation/json. No olvidar ademas la linea app.use(express.json({extended: true})); en index.js

    //revisar si hay errores de validacion
    const errores = validationResult(req); //obtiene los errores de los check en usuarios.js
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }


    //Extraer email y password del body
    const {email, password} = req.body;

    try {
        // Revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({ email });

        if(usuario) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // crea el nuevo usuario
        usuario = new Usuario(req.body);

        // Hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt );

        // guardar usuario
        await usuario.save();

        //JWT Tiene headers, payload (genermente id del usuario) y firma (que damos con variable de entorno (en nuestro caso SECRETA))

        // Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id //id del usuario que se está guardando
            }
        };

        // firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error;

            // Mensaje de confirmación
           // res.json({msg: 'Token creado con exito'});
            res.json({ token });
        });


    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}
