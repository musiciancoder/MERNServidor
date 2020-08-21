//MODELO DE PROYECTO

const mongoose = require('mongoose');



const ProyectoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId, //este va a ser el _id en Mongo
        ref: 'Usuario'
    },
    creado: {
        type: Date,
        default: Date.now()
    }
})
