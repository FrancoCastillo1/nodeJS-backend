import app from "./index.js";
import config from "./config/index.js";
import { Server } from "socket.io";
import { deleteDataNoClient } from "./service/products.service.js";

const {port} = config
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
    socket.on("actualizar",async(data) =>{
        console.log("llegó", data)
        try{
            const productsTotal = await deleteDataNoClient()
            io.emit("cambiosEcomerse",productsTotal)
            console.log("aaaa")
        }catch(err){
            io.emit("cambios-ecomerse",false)
        }
    })
})