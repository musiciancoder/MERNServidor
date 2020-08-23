const Proyecto = require('../models/Proyecto');

exports.crearProyecto = async (req,res)=>{

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
