const { response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario  = require('../models/usuarios');
const validar_JWT = async(req, res = response,next)=>{

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay un token en la peticion'
        });
    }

    try {
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido - Usuario no existe en DB'
            });
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido - Usuario con estado false'
            });
        }


        req.usuario= usuario;
        
 
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token no valido'
        });
        
    }







}

module.exports = {
    validar_JWT
}