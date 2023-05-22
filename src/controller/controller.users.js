import { Router } from "express";
import {patchRolUsers}  from "../service/user.service.js"

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
        res.json({message:"Internal Server Error",error:err})
    }
})

export default users