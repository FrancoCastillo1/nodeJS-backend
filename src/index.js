import express from "express";
import routes from "./router/index.js";
import handlebars  from "express-handlebars";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import {Server} from "socket.io"
const app = express();
app.engine("handlebars",handlebars.engine())
app.set("views",__dirname + "/views") 
app.set("view engine", "handlebars")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/public",express.static( __dirname + "/public"))
routes(app)
app.get("/",(req,res)=> res.send("hello"))
const http = app.listen(8080, ()=> console.log('the server is running'));
const io = new Server(http)
io.on('connection', socket =>{
    console.log("Nuevo cliente conectado")
    socket.on("message",data =>{
        console.log(data)
    })
})