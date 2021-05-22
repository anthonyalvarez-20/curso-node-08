const { Router } = require('express')
const router = Router()
const {usuariosGet,usuariosPost,usuariosPut,usuariosPatch,usuariosDelete} = require('../controllers/usuarios')

//rutas de mi app
router.get('/',usuariosGet)
router.post('/', usuariosPost )//sirve para crear nuevos recursos
router.put('/:id',usuariosPut)//sirve para actualizar la data, mandamos el id como parametro en la ruta
router.patch('/',usuariosPatch)
router.delete('/',usuariosDelete)//para borrar

  module.exports = router