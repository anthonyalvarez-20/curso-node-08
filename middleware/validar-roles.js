const { response } = require("express");

const validar_roles = (req, res = response, next)=>{
    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin autenticar el token primero'

        });
    }
        const {rol, nombre} = req.usuario;
        if(rol !== 'ADMIN_ROL'){
            return res.status(401).json({
                msg: `La persona ${nombre} no es un administrador - no puede realizar esta tarea`

            });
        }

        next();

    
}

const tiene_roles = (...roles)=>{//con los 3 pruntos puedo hacer un arreglo y enviar los argumentos que sean necesarios
    return (req, res = response, next)=>{
        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin autenticar el token primero'
    
            });
        }

        if(!roles.includes(req.usuario.rol)){//el usuario.rol tiene que incluir los roles que pasamos por argumentos
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            });
        }

        next();


    }

}

module.exports = {
    validar_roles,
    tiene_roles
}