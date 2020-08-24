const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');

exports.crearProyecto = async (req,res)=>{

    //revisar si hay errores (se llama al check del Route)
    const errores = validationResult(req); //obtiene los errores de los check en usuarios.js
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    try {
        //Crear nuevo proyecto
        const proyecto = new Proyecto(req.body);  //En postman se llama solo con nombre en el body

        //Guardar creador del proyecto via JWT
        proyecto.creador = req.usuario.id; //req.usuario del middleware auth.js


       //guardamos el proyecto
        proyecto.save();
        res.json(proyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }


}
