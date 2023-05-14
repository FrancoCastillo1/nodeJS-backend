import { Router } from "express";
import mongoose from "mongoose";
import mensajeManager from "../DAO/mongo/messages.dao.js";

const message = Router()

message.get("/",async(req,res)=>{
    const mensaje = await mensajeManager.getMessages()
    req.logger.info(mensaje)
    if(!mensaje[0]) return mensaje[1]
     res.render("chat",{mensaje,})
})

message.post("/",async(req,res)=>{
    const {user, message } = req.body
    req.logger.info(message)
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