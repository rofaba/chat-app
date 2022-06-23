const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

 const messages = [
    { author: "Chat_Bot", text: "Bienvenido" }   
 ];
 app.use(express.static("public"));
 
const PORT = process.env.PORT || 8080;

io.on('connection',socket => {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);

    socket.on('new-message',data => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
 });






httpServer.listen(PORT, function () {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});