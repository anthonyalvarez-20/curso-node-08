const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '')=>{

    return new Promise((resolve,reject)=>{


        const paylod = { uid};
        jwt.sign(paylod,process.env.SECRETORPRIVATEKEY,{
            expiresIn: '4h'//tiempo de expiracion del token
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }

        })//paylod es la informacion del usuario que quiero que se encuentre en el token
    })

}

module.exports = {
    generarJWT
}