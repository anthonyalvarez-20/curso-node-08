//con esto manjeamos la nueva coleccion de roles que creamos en la base de datos
const {Schema, model} = require('mongoose');

const Schema_rol = Schema({
    rol:{
        type: String,
        required: [true, 'El rol es obligatorio']
    }

});

module.exports = model('Role',Schema_rol);