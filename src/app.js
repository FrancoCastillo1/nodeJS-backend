import app from "./index.js";
import config from "./config/index.js";
import { Server } from "socket.io";

const {port} = config
console.log(port)
const http = app.listen(port,()=> console.log(`server running on port ${port}`))

const io = new Server(http)
io.on('connection', socket =>{
    console.log("Nuevo cliente conectado")
    socket.on("message",data =>{
        console.log(data)
        socket.emit("nuevoMensaje",data)
    })
    socket.on("actualizar",data =>{
        console.log("se encio",data)
        socket.emit("updated",data)
    })
})