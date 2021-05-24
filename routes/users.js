

const {check} = require('express-validator');
const { Router } = require('express');
const router = Router();//sirve para ir a las rutas

const{
  validar_user,
  validar_JWT,
  tiene_roles,
  validar_roles
} = require('../middleware');//cuando creas un archivo index, el programa siempre buscara ese archivo para ejecutarlo

const {validar_rol,validar_correo,validar_usuarioporID} = require('../helpers/db-validators')
const {usuariosGet,usuariosPost,usuariosPut,usuariosPatch,usuariosDelete} = require('../controllers/usuarios')




//rutas de mi app
router.get('/',usuariosGet);

router.post('/', [
  //arreglo de middleware 1)ruta,mmiddleware[],funcion. Aqui poneos las respectivas validaciones, gracias a paquete de "express-validator"
check('nombre','El nombre es obligatorio').not().isEmpty(),//para validar de que el nombre sea ingresado
check('password','La contraseña debe de ser mas de 6 letras').isLength({min:6}),//que sea minimo de 6 letras
check('password','La contraseña es obligatoria').not().isEmpty(),
check('correo','Correo no valido').isEmail(),//con isEmail le especifico que es un correo
check('correo').custom(validar_correo),
//check('rol','No es un rol permitido').isIn(['ADMIN_ROL','USER_ROL']),//en el isIn ponemos las variables permitidas en ese campo
check('rol').custom(validar_rol),
validar_user
],usuariosPost )//sirve para crear nuevos recursos

router.put('/:id',[
  check('id','No es un id valido').isMongoId(), //con esto valido que el id que se buscar sea un id de tipo mongodatabse
  check('id').custom(validar_usuarioporID),
  validar_user
],usuariosPut)//sirve para actualizar la data, mandamos el id como parametro en la ruta

router.patch('/',usuariosPatch)
router.delete('/:id',[
  validar_JWT,
  //validar_roles,
  tiene_roles('ADMIN_ROL'),
  check('id','No es un id valido').isMongoId(), //con esto valido que el id que se buscar sea un id de tipo mongodatabse
  check('id').custom(validar_usuarioporID),
  validar_user
],usuariosDelete)//para borrar

  module.exports = router