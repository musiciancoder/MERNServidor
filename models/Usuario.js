const mongoose = require('mongoose');

//con .Schema se define la configuracion de usuarios
const UsuariosSchema = mongoose.Schema({
    nombre: {
        type: String, //los types q acepta estan en www.mongoose.com
        required: true,
        trim: true
    },
    email: {
        type: String, //los types q acepta estan en www.mongoose.com
        required: true,
        trim: true,
        unique: true //no puede haber dos usuarios con mismo correo

    },
    password: {
        type: String, //los types q acepta estan en www.mongoose.com
        required: true,
        trim: true
    },
    registro: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Usuario', UsuariosSchema);//modelo de nombre Usuario con la configuracion dada en UsuariosSchema
