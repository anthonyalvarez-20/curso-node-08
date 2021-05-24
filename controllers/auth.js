const { response,request } = require("express");
const bcryptjs = require ('bcryptjs');//encriptar la contraseña

const Usuario = require('../models/usuarios');
const {generarJWT} = require('../helpers/generar-jwt');



const login =  async(req = request ,res = response)=>{
    const {correo,password} = req.body;
    try {

        //Verificar si el correo existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                message: 'Usuario/Password no con correctos'
            })

        }
        //Verificar si el estado del usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                message: 'Usuario Incorrecto'
            });

        }
        //Verificar la contraseña
        const verificar_psw = bcryptjs.compareSync(password, usuario.password);//para compara el password que viene del body 
                                                                            //con el que esta en la base de datos
        if(!verificar_psw){
            return res.status(400).json({
                message: 'Password incorrecto'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        }) 

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salio mal hable con el administrador'
        })
        
    }


    
}

module.exports = {
    login
}