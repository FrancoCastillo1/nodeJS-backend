import { Router } from "express";
import {patchRolUsers}  from "../service/user.service.js"
import upload from "../utlis/multer.js";
import imagesUser from "../middlewares/imagesUser.js";

const users = Router()

users.patch("/premium/:uid",async(req,res)=>{
    const {uid} = req.params
    const {rol} = req.body
    const {email} = req.user
    try{
        const patchRolUser = await patchRolUsers(uid,rol,email)
        if(!patchRolUser[1]) return res.json({message:patchRolUser[0]})
        res.json({message:"Se cambio el rol del usuario correctamente"})
    }catch(err){
        res.json({message:err,error:true})
    }
})

users.post("/:uid/documents",imagesUser,upload.single("file"),(req,res)=>{
    res.status(201).json({message:"Se guardo la imagen correctamente"})
       /*  res.status(500).json({message:err,error:true}) */
})

export default users