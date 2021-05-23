const { response,request } = require('express')//esto se lo hace para que nos apaarezca las opciones al momento de usar el res
const Usuario = require ('../models/usuarios')
const bcryptjs = require ('bcryptjs')//encriptar la contraseña

const usuariosGet = async(req = request, res = response) => {//siempre al momento de mandar una respuesta es en el formato json
    
    const {limite = 5, desde = 0} = req.query
    const query = {estado:true}
  
 

    const [total,usuarios] = await Promise.all([//aqui podemos poner nuestras promesas que se van a ejecutar
        Usuario.countDocuments(query),//sacar el total de registros
        Usuario.find(query)//obtenemos y presentaos todo los usuarios de la bd, y le ponemos la condicion de que
        //me retorne solo los usuarios que esten activos 
                .limit(Number(limite))//con el number transformamos a int el string, y este limit es cuantos registrs quiero que me devuelva
                .skip(Number(desde))

    ])
    res.json({//el formato json se lo tiene que enviar como un objeto
        total,
        usuarios
    })
}
const usuariosPost = async (req = request, res=response)=>{
 

    const {nombre, correo, password, rol}  = req.body//aqui esta recogiendo la informacion que el usuario esta mandando del body
    //esto se puede probar en el postman

    const usuario = new Usuario({nombre, correo, password,rol});
    
    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(/*/por defecto esta en 10 */);//esto nos da el numero de vueltas que quiere que haga para poner mas dificil la encryptacion
    usuario.password = bcryptjs.hashSync( password, salt );
    //guardar en la base de datos
    await usuario.save();

    res.json({
        msg: 'post API - controlador',
        usuario
    })
}

const usuariosPut = async(req, res=response)=>{
    const {id }= req.params
    const {_id,password,google,correo, ...resto} = req.body//con esto extraigo esos datos y no permito que se actualicen, ej el correo

    //Validar contra base de datos
    if(password){
         //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(/*/por defecto esta en 10 */);//esto nos da el numero de vueltas que quiere que haga para poner mas dificil la encryptacion
    resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto)
    res.json(usuario)
}

const usuariosPatch = (req,res = response)=>{
    res.json({
        msg: 'patch API - controlador'
    })
}

const usuariosDelete = async(req,res = response)=>{

    const {id} = req.params
    //borrarlo fisicamente de la base de datos
    //const usuario = await Usuario.findByIdAndDelete(id), no es recomendado hacerlo
    
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false})
    res.json(usuario)
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}