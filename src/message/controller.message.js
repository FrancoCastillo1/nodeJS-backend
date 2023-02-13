import { Router } from "express";
import mongoose from "mongoose";
import mensajeManager from "../dao/messagesManager.js";

const message = Router()

message.get("/",async(req,res)=>{
    const mensaje = await mensajeManager.getMessages()
    console.log("hola",mensaje)
    if(!mensaje[0]) return mensaje[1]
     res.render("chat",{mensaje,})
})

message.post("/",async(req,res)=>{
    const {user, message } = req.body
    console.log(user,message)
    const mensaje = await mensajeManager.postMessages(user,message)
    if(!mensaje[0]) return res.send(mensaje[1])
    return res.send(`${user}, tu mensaje se envio correctamente`)
})

message.delete("/:id",async(req,res)=>{
    const {id} = req.params
    const mensaje = await mensajeManager.deleteMessage(id)
    if(!mensaje[0]) return res.send(mensaje[1])
    return res.send(`${user}, tu mensaje se actualizo correctamente`)
})

export default message