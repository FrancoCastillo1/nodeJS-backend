import { Router } from "express";
import mensajeManager from "../DAO/mongo/messages.dao.js";
import authorizationJWT from "../middlewares/authorization.jwt.js";

const message = Router()

message.get("/",authorizationJWT("admin"),async(req,res)=>{
    try{
        const mensaje = await mensajeManager.getMessages()
        if(!mensaje[0]) return mensaje[1]
         res.render("chat",{mensaje,})
    }catch(err){
        res.status(500).json({message:err,error:true})
    }
})

message.post("/",authorizationJWT("admin"),async(req,res)=>{
    const {firts_name} = req.user
    const { message } = req.body
    try{
        const mensaje = await mensajeManager.postMessages(firts_name,message)
        if(!mensaje) return res.status(404).json({message:`No se pudo enviar correctamente el mensaje`})
        return res.status(201).json({message:`${firts_name}, tu mensaje se envio correctamente`})
    }catch(err){
        res.status(500).json({message:err,error:true})
    }
})

message.delete("/:id",authorizationJWT("admin"),async(req,res)=>{
    const {id} = req.params
    const {firts_name} = req.user
    try{
        const mensaje = await mensajeManager.deleteMessage(id)
        if(!mensaje) return res.status(404).json({message:"No se encontro el mensaje"})
        return res.status(204).json({message:`${firts_name}, tu mensaje se actualizo correctamente`})
    }catch(err){
        res.status(500).json({message:err,error:true})
    }
})

export default message