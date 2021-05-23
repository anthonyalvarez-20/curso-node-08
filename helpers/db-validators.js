const Role = require('../models/role')
const Usuario = require ('../models/usuarios')

const validar_rol = async(rol = '')=>{
    const existe_rol = await Role.findOne({ rol })
    if(!existe_rol){
      throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
  
  }

const validar_correo = async (correo = '')=>{
    const existe = await Usuario.findOne({correo})//aqui obtenemos el correo del arreglo de objetos
    if(existe){
        throw new Error(`El correo: ${correo}, ya esta registrado en la BD`)

    }
}
const validar_usuarioporID = async (id)=>{
    const existe_usuario = await Usuario.findById(id)
    if(!existe_usuario){
        throw new Error(`El usuario con id: ${id} no existe`)

    }
}

  module.exports = {
      validar_rol,
      validar_correo,
      validar_usuarioporID
  }