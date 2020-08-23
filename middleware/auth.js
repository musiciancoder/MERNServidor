//PARA VERIFICAR SI EL USUARIO ESTA AUTENTICADO, ENTONCES PODRA CREAR NUEVOS PROYECTOS
//ESTE MIDDLEWARE SE LLAMA EN ARCHIVO routes/proyectos.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
   //Leer el token del header

    const token = req.header('x-auth-token'); //en POSTMAN se pega el token generado al autenticar usuario en el headers de http://localhost:4000/api/proyectos

    console.log(token);

    //Revisar si no hay token
    if (!token){
        return res.status(401).json({msg: 'No hay Token, permiso no válido'}); //se prueba en browser con http://localhost:4000/api/proyectos
    }

    //Validar el token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        //Para acceder al id
        req.usuario = cifrado.usuario; //Anteriormente al crear un JWT cuando el usuario se esta registrando habiamos asignado un usuario en el payload
        next(); // para que en proyectos.js se vaya al siguiente middleware
    } catch (error) {
        res.status(401).json({msg: 'Token no válido'});
    }


}
