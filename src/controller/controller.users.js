import { Router } from "express";
import {patchRolUsers}  from "../service/user.service.js"
import upload from "../utlis/multer.js";
import { createDocument,conectionUser } from "../service/user.service.js";
import imagesUser from "../middlewares/imagesUser.js";

const users = Router()

users.patch("/premium/:uid",async(req,res)=>{
    const {uid} = req.params
    const {rol} = req.body
    const {email} = req.user
    try{
        const patchRol = await patchRolUsers(uid,rol,email)

        patchRol[1] == undefined && (patchRol = true)

        if(!patchRol[1]) return res.status(patchRol[2]).json({message:patchRol[0]})
        res.status(200).json({message:"Se cambio el rol del usuario correctamente"})
    }catch(err){
        res.status(500).json({message:err,error:true})
    }
})

users.post("/:uid/documents"/* ,imagesUser */,upload.single("myFile"),async(req,res)=>{
    const {email} = req.user
    const {name,site} = req.body
    try{
        const newDoc = await createDocument(email,site,name,path)
        res.status(201).json({message:"Se guardo la imagen correctamente"})
    }catch(err){
        res.status(500).json({message:err,error:true})
    }
       /*  res.status(500).json({message:err,error:true}) */
})

users.delete("/logout",async(req,res)=>{
    const {email} = req.user
    try{
        const userConection =  await conectionUser(email)
       /*  req.cookies = {} */
        res.cookie("authToken","",{expires:new Date(2000, 0, 1)})
        res.cookie("connect.sid","",{expires:new Date(2000, 0, 1)})

        res.status(userConection[1]).json({message:userConection[0]})

    }catch(err){
        res.status(500).json({message:err,error:true})
    }
})

export default users