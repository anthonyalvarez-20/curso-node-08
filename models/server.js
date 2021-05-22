//Creacion de nuestro web server
const express = require('express')
const cors = require('cors')
class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'

        //Middleware(funciones que van a añadir otra funcionalidad al web server)
        this.middleware()
        //rutas de mi aplicacion
        this.routers()
    }

    middleware(){
        //Cors
        this.app.use(cors())

        //Parseo y lectura del body(esto es un requerimiento que llega a nuestro servidor en formato json o cualquier otro formato)
        this.app.use(express.json())//esto nos ayuda a que cualquier informacion que llegue se serizialice en formato json

        //directorio publico
        this.app.use(express.static('public'))//este es el directorio principal que nos va a dirigir al index.html
    }

    routers(){
        this.app.use(this.usuariosPath,require('../routes/users'))//aqui estamos llamando a la carpeta de rutas que es donde
        //tengo mis rutas definicas
    }

    liste(){
        this.app.listen(this.port,()=>{
            console.log("Servidor corriendo en el puerto ",this.port)
        })
    }


}

module.exports = Server