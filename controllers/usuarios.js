const { response,request } = require('express')//esto se lo hace para que nos apaarezca las opciones al momento de usar el res

const usuariosGet = (req = request, res = response) => {//siempre al momento de mandar una respuesta es en el formato json
    const {q,nombre,apikey} = req.query
    res.json({//el formato json se lo tiene que enviar como un objeto
        msg:'get API - controlador',
        q , nombre, apikey

    })
}
const usuariosPost = (req = request, res=response)=>{

    const {nombre, edad}/*esto nos ayuda a que nuestro servidor solo reciba esa informacion.*/  = req.body//aqui esta recogiendo la informacion que el usuario esta mandando del body
    //esto se puede probar en el postman
    res.json({
        msg: 'post API - controlador',
        nombre,edad
    })
}

const usuariosPut = (req, res=response)=>{
    const {id }= req.params
    res.json({
        msg: 'put API - controlador',
        id
    })
}

const usuariosPatch = (req,res = response)=>{
    res.json({
        msg: 'patch API - controlador'
    })
}

const usuariosDelete = (req,res = response)=>{
    res.json({
        msg: 'delet API - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}