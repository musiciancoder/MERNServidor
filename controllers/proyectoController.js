const Proyecto = require('../models/Proyecto');

exports.crearProyecto = async (req,res)=>{

    try {
        //Crear nuevo proyecto
        const proyecto = new Proyecto(req.body);

        //Guardar proyecto en BBDD
        proyecto.save();
        res.json(proyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }


}
