//todo esto se llo hace con el archivo de mongoose y asi esta en la documentacion
const { Schema, model } = require ('mongoose')




const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required:[true, 'El correo es obligatorio'],
        unique: true//para que solo pueda haber un correo y no se repita
    },
    password: {
        type: String,
        required:[true, 'El contraseña es obligatoria']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required:true,
        enum:['ADMIN_ROL','USER_ROL'],//esto nos ayuda a validar si el usuario que ingreso es admin o un usuario normal
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false,//cambiara de estado si el usuario se creo la cuenta con una cuenta de google
    },
})
//esto nos sirve para cuando se imprime la informacion del usuario no aparezca la version y la contraseña
UsuarioSchema.methods.toJSON = function(){
    const {__v, password,_id,...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario',UsuarioSchema)//nombr de la tabla,el Schema que creamos
