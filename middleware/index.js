const validaCampo = require('../middleware/validar-campos');
const validarJWT = require('../middleware/validar-jwt');
const validaRoles = require('../middleware/validar-roles');

module.exports={
    ...validaCampo,
    ...validarJWT,
    ...validaRoles
}