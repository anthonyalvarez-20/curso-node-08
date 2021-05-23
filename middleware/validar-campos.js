const {validationResult} = require('express-validator')

const validar_user = (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
    return res.status(400).json(errors)
    }

    next();//con esto decimos que si la funcion cumplio con todo los requisitos, pase al sgte middleware
}

module.exports = {
    validar_user
}