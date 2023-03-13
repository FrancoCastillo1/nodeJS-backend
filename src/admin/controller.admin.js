import { Router } from "express";
/* import {authTokenCookie } from "../utlis/jwt.utilis"; */

const admin = Router()

admin.get("/private",/* authTokenCookie, esto debe ser reemplazado por un login de passport(con JWT,obvio) */(req,res)=>{
    res.json({message:"authenticate"})
})

export default admin