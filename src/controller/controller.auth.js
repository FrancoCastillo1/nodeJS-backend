import { Router } from "express";
import passport from "passport";
import {generateToken,createObjCooke} from "../utlis/jwt.utilis.js"
import {sendMailForNewPassword} from "../service/mail.service.js"
import {corroboratePassword} from "../service/auth.service.js"
import { conectionUser } from "../service/user.service.js";
import passportCall from "../utlis/passportCallback.js";

const auth = Router()

auth.post("/login",passport.authenticate("login",{failureRedirect:"/faillogin"}),async(req,res)=>{
   /*  const reqUserPassport = req.user */
    if(!req.user) return res.status(400).json({message:"El correo y la contraseña no coiniden"})
    createObjCooke(req.user,res)
    /* req.user = reqUserPassport */
    try{
        const userConection = await conectionUser(req.user.email)

        return res.status(userConection[1]).json({status:"success", payload:req.user,message:userConection[0]})
    }catch(err){
        res.status(500).json({message:err,error:true})
    }
})

auth.get("/faillogin",(req,res) =>{
    res.status(500).json({error:"Failed Login:(",error:true})
})

auth.post("/",passport.authenticate("register",{failureRedirect:"/failregister"}),(req,res)=>{
    try{
      return res.status(201).json({message:"register succesfull"})
    }catch(err){
        if(err.code == 11000) return res.json({message:"el usuario ya existe"})
        return res.status(500).json({message:err,error:true})
    }
  
})

auth.get("/failregister",(req,res)=>{
    res.status(500).json({message:"failed register",error:true})
})

auth.post("/sendmailforpassword",async(req,res)=>{
    const {emailforPassword} = req.body
    try{
         await sendMailForNewPassword(emailforPassword)
        res.status(201).json({message:"Se ha enviado el correo de recuperación"})
    }catch(err){
        res.status(500).json({message:err,error:true})
    }
})

auth.patch("/restorepassword",async(req,res)=>{
    const {email,newPassword,repeatPassword} = req.body
    try{
        const corroborate = await corroboratePassword(email,newPassword,repeatPassword)

        corroborate[1] == undefined &&(corroborate[1] = true)

        if(!corroborate[1]) return res.status(corroborate[2]).json({message:corroborate[0]})
        res.status(201).json({message:"Se cambio la contraseña correctamente"})  
    }catch(err){
        res.status(500).json({message:err,error:true})
    }
})

auth.get("/github",passport.authenticate("github",{scope:[`user:email`]}),async(req,res)=>{})

auth.get("/githubcallback",passport.authenticate("github",{failureRedirect:"/faillogin"}),async(req,res)=>{
    createObjCooke(req.user,res)
    res.redirect("/")
})

auth.get("/google",passport.authenticate("google",{scope:["profile"]}),async(req,res)=>{})

auth.get("/google/callback",passport.authenticate("google",{failureRedirect:"/"}),async(req,res) =>{
   try{
        const newObj = {
            firts_name:req.user.firts_name,
            last_name:req.user.last_name,
            googleId:req.user.googleId,
            rol:req.user.rol,
        }
        const token = generateToken(newObj)
        res.cookie("authToken",token) 
        res.json({message:"login Succesful"})
   }catch(err){
        if(err.code == 11000) res.status(403).json({message:"El correo y la contraseña no coinciden"})
        res.status(500).json({message:err,error:true})
   }
})
export default auth