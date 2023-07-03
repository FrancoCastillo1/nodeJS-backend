import { Router } from "express";
import {patchRolUsers}  from "../service/user.service.js"
import upload from "../utlis/multer.js";
import { createDocument,logoutUser } from "../service/user.service.js";
import imagesUser from "../middlewares/imagesUser.js";

const users = Router()

users.patch("/premium/:uid",async(req,res)=>{
    const {uid} = req.params
    const {rol} = req.body
    const {auth_ide} = req.user
    try{
        const patchRol = await patchRolUsers(uid,rol,auth_ide)

        patchRol[1] == undefined && (patchRol[1] = true)

        if(!patchRol[1]) return res.status(patchRol[2]).json({message:patchRol[0]})
        res.status(200).json({message:"Se cambio el rol del usuario correctamente"})
    }catch(err){
        res.status(500).json({message:typeof err == "object"?"Internal Server Error":err,error:true})
    }
})

users.post("/:uid/documents"/* ,imagesUser */,upload.single("myFile"),async(req,res)=>{
    const {auth_ide} = req.user
    const {name,siteB} = req.body
    try{
        const newDoc = await createDocument(auth_ide,siteB,name)
        res.status(201).json({message:"Se guardo la imagen correctamente"})
    }catch(err){
        res.status(500).json({message:typeof err == "object"?"Internal Server Error":err,error:true})
    }
})

users.delete("/logout",async(req,res)=>{
    const {auth_ide} = req.user
    try{
        const userConection =  await logoutUser(auth_ide)

        userConection[1] == undefined && (userConection[1] = true)

        res.cookie("authToken","",{expires:new Date(2000, 0, 1)})
        res.cookie("connect.sid","",{expires:new Date(2000, 0, 1)})
        if(!userConection[1]) return res.status(userConection[2]).json({message:userConection[0]})
        res.status(204).json({message:`El usuario se deslogueo correctamente`})

    }catch(err){
        res.status(500).json({message:typeof err == "object"?"Internal Server Error":err,error:true})
    }
})

export default users