import { Router } from "express";
import { io } from "socket.io-client";

const real = Router()
const socket = io()
real.get("/",(req,res)=>{
    res.render("realtimeProducts")
})
export default real