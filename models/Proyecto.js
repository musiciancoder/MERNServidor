const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({
    nombre: {
        type: String, //se ve en la respuesta de POSTMAN
        required: true,
        trim: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId, //El proyecto pertenece a un usuario;es el id, se ve en la respuesta de POSTMAN
        ref: 'Usuario'
    },
    creado: {
        type: Date, //se ve en la respuesta de POSTMAN
        default: Date.now()
    }
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);
