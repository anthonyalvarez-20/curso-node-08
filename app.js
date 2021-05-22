//1) Instalamos el express (npm i express) para crear nuestro webserver y "dotenv" para crear nuestras variables de entorno.
//2)creamos nuestro web server(esto se crea en la clase de server.js)
//3)creamos el archivo (.env) que es donde pondremos nuestras variables de entorno
//4)Creamos una carpeta llama models y de ahi un archivo llamado server.js
//5)Luego creamos nuestra carpeta publica que es donde estara nuestros archivos html para nuestra pagina web
//6) Tambien instalamos otro paquete llamado cors (npm i cors) permite proteger nustro servidor de na manera superficial
//pero muchos navegadores como chrome o firefox les puede dar error si el cors no esta habilitado y nosotros intenmos llamar nuestro servidor
//al momento de ya guardar nuestro repositorio en git si llegamos a borrar algo lo poemos recuperar (git checkout --)
//Podemos crear una version del codigo antes de realizar cambios para que podamos descargarlo de un punto en especifico
//git tag -a v1.0.0 -m "Mensaje"
//git push --tag
//nunca se debe olvidar en el packege.json poner el start debido a que despues al subirlo a heroku no va a abrir el link
const Server = require('./models/server')

require('dotenv').config()//con esto obtenemos nuestras variables de entorno


 
const server = new Server()
server.liste()
