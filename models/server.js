//Creacion de nuestro web server
const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config');
class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //conexion a la base de datos
        this.databaseConnection();


        //Middleware(funciones que se ejecuta antes de llamar a un controlador o seguir ocn las peticiones)
        this.middleware();
        //rutas de mi aplicacion
        this.routers();
    }

    async databaseConnection (){
        await dbConnection();
    }



    middleware(){
        //Cors
        this.app.use(cors());

        //Parseo y lectura del body(esto es un requerimiento que llega a nuestro servidor en formato json o cualquier otro formato)
        this.app.use(express.json());//esto nos ayuda a que cualquier informacion que llegue se serizialice en formato json

        //directorio publico
        this.app.use(express.static('public'));//este es el directorio principal que nos va a dirigir al index.html
    }

    routers(){
        this.app.use(this.usuariosPath,require('../routes/users'));//aqui estamos llamando a la carpeta de rutas que es donde
        //tengo mis rutas definicas
        this.app.use(this.authPath,require('../routes/auth'));
    }

    liste(){
        this.app.listen(this.port,()=>{
            console.log("Servidor corriendo en el puerto ",this.port);
        });
    }


}

module.exports = Server