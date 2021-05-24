const { Router } = require('express');
const {check} = require('express-validator');
const router = Router();
const {validar_user} = require('../middleware/validar-campos');

const {login} = require('../controllers/auth');

router.post('/login',[
    check('correo','Correo obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validar_user

],login);

module.exports = router;