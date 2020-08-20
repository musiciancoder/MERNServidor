

const Usuario = require('../models/Usuario');

//Con esto podemos insertar usuarios en el compass de Mongo. Lo prueba enviando el usuario {
//    "nombre":"juan",
//     "email":"correo@gmail.com",
//     "password":123
// }   por postman
exports.crearUsuario = async (req, res) => {
    //  console.log('desde crearUsuario');
    //Para probar en Postman con http://localhost:4000/api/usuarios siempre se hace con  console.log(req.body); en los Headers de Postman ademas se debe escribir Content-Type appilcation/json. No olvidar ademas la linea app.use(express.json({extended: true})); en index.js

    try {
        let usuario;

        //crear el nuevo usuario
        usuario = new Usuario(req.body);//argumentos desde en el body

        //guardar usuario en BBDD de mongo
        await usuario.save();

        //Mensaje de confirmacion
        res.send('Usuario creado correctamente');
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}
