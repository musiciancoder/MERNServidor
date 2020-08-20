const bcryptjs = require('bcryptjs');

const Usuario = require('../models/Usuario');

//Con esto podemos insertar usuarios en el compass de Mongo. Lo prueba enviando el usuario {
//    "nombre":"juan",
//     "email":"correo@gmail.com",
//     "password":123
// }   por postman
exports.crearUsuario = async (req, res) => {
    //  console.log('desde crearUsuario');
    //Para probar en Postman con http://localhost:4000/api/usuarios siempre se hace con  console.log(req.body); en los Headers de Postman ademas se debe escribir Content-Type appilcation/json. No olvidar ademas la linea app.use(express.json({extended: true})); en index.js

    //Extraer email y password del body
    const {email, password} = req.body;

    try {

        //Revisar q el usuario q se registra sea unico
        let usuario = await Usuario.findOne({email});// con metodo findOne se busca en la BBDD si hay un usuario con ese email ya creado

        if(usuario){
            return res.status(400).json({ msg: 'El usuario ya existe'});
        }

        //crear el nuevo usuario
        usuario = new Usuario(req.body );//argumentos desde en el body

        //Hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);


        //guardar usuario en BBDD de mongo
        await usuario.save();

        //Mensaje de confirmacion
        res.json({msg: 'Usuario creado correctamente'});
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}
