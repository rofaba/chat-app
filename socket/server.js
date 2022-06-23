const { Console } = require('console')
const express = require('express')
const app = express()

const http = require('http')
const server = http.createServer(app)


const {Server} = require('socket.io')

const io = new Server(server)

io.on('connection', (socket) => { //"connection" se ejecuta la primera vez que se abre una nueva conexión
    // console.log('Usuario conectado') 
    socket.on('chat', (msg) => {
        io.emit('chat', msg)
    })

    })




app.use(express.static('./public'))

// Indicamos que queremos cargar los archivos estáticos que se encuentran en dicha carpeta
app.get('/', (req, res) => { // Esta ruta carga nuestro archivo index.html en la raíz de la misma
    res.sendFile('index.html', {root: __dirname})
})


server.listen(3000, () => console.log('Servidor OnLine')) // El servidor funcionando en el puerto 3000

