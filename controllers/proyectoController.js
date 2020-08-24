const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');

exports.crearProyecto = async (req, res) => {

    //revisar si hay errores (se llama al check del Route)
    const errores = validationResult(req); //obtiene los errores de los check en usuarios.js
    if (!errores.isEmpty()) {
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

//Obtener todos los proyectos del usuario actual

exports.obtenerProyectos = async (req, res) => {
    try {
        //console.log(req.usuario);
        const proyectos = await Proyecto.find({creador: req.usuario.id}).sort({creado: -1}); //devuelve todos. creador es propiedad de Proyecto definida en el modelo y req.usuario.id es el id del usuario que ya esta autenticado previamente
        res.json({proyectos});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Actualizar un proyecto
exports.actualizarProyecto = async (req, res) => {
    //revisar si hay errores (se llama al check del Route)
    const errores = validationResult(req); //obtiene los errores de los check en usuarios.js
    if (!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()});
    }

    //Extraer la informacion del proyecto
    const {nombre} = req.body;
    const nuevoProyecto = {};

    if (nombre) {
        nuevoProyecto.nombre = nombre;
    }

    try {
        //revisar el ID
        let proyecto = await Proyecto.findById(req.params.id);

        //si el proyecto existe o no
        if (!proyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        //verificar el creador del proyecto
        if(proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No autorizado'});
        }

        //actualizar
        proyecto = await Proyecto.findByIdAndUpdate({_id: req.params.id},{$set:
        nuevoProyecto},{new:true});

        res.json({proyecto});


    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }


}

exports.eliminarProyecto = async (req, res) => {

    try { //revisar el ID
        let proyecto = await Proyecto.findById(req.params.id);

        //si el proyecto existe o no
        if (!proyecto) {
            return res.status(404).json({msg: 'Proyecto no encontrado'});
        }

        //verificar el creador del proyecto
        if (proyecto.creador.toString() !== req.usuario.id) {
            return res.status(401).json({msg: 'No autorizado'});
        }

        //Eliminar el proyecto
        await Proyecto.findOneAndRemove( {_id: req.params.id} );
        res.json({msg: 'Proyecto eliminado'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }
}
