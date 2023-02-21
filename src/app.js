import app from "./index.js";
import config from "./config/index.js";
import { Server } from "socket.io";

const {port} = config
console.log(port)
const http = app.listen(port,()=> console.log(`server running on port ${port}`))

let array = []
const io = new Server(http)
io.on('connection', socket =>{
    console.log("Nuevo cliente conectado")
    socket.on("message",data =>{
        array.push(data)
        console.log(array)
        io.emit("nuevoMensaje",array)
    })
    socket.on("actualizar",data =>{
        socket.emit("updated",data)
    })
})