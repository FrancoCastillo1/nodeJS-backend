import { Router } from "express";
import passport from "passport";
import UserClass from "../DAO/mongo/user.dao.js";
import {generateToken} from "../utlis/jwt.utilis.js"
import {sendMailForNewPassword} from "../service/mail.service.js"
import {corroboratePassword} from "../service/auth.service.js"
/* import { generateToken } from "../utlis/jwt.utilis.js"; */

const auth = Router()
const instanceUser = new UserClass()

const createObjCooke = (req,res) =>{
    const newObj = {
        firts_name:req.user.firts_name,
        last_name:req.user.last_name,
        email:req.user.email ?? "",
        googleId:req.user.googleId ?? "",
        rol:req.user.rol
    }
    const token = generateToken(newObj)
    res.cookie("authToken",token) 
}
auth.post("/login",passport.authenticate("login",{failureRedirect:"/faillogin"}),async(req,res)=>{
    req.logger.info("helo")
    if(!req.user) return res.status(400).json({message:"El correo y la contraseña no coiniden"})

    createObjCooke(req,res)
    
    res.json({status:"success", payload:req.user})
})

auth.get("/faillogin",(req,res) =>{
    res.status(500).json({error:"Failed Login:("})
})

auth.post("/",passport.authenticate("register",{failureRedirect:"/failregister"}),(req,res)=>{
    try{
      console.log("xddd")
      return res.status(201).json({message:"register succesfull"})
    }catch(err){
        if(err.code == 11000)return res.json({message:"el usuario ya existe"})
        return res.status(500).json({err})
    }
  
})

/* auth.get("/restorepasswordrender",(req,res)=>{
    console.log("xd")
    res.render("introducirCorreo.handlebars")
}) */

auth.get("/failregister",(req,res)=>{
    res.status(500).message({message:"failed register"})
})

auth.post("/sendmailforpassword",async(req,res)=>{
    const {emailforPassword} = req.body
    console.log("a",emailforPassword, req.body)
    try{
        const postNewPassword = await sendMailForNewPassword(emailforPassword)
        res.status(200).json({message:"Se ha enviado el correo de recuperación",status:200})
    }catch(err){
        res.status(500).json({message:err})
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
        res.status(500).json({message:err})
    }
})

auth.get("/github",passport.authenticate("github",{scope:[`user:email`]}),async(req,res)=>{})

auth.get("/githubcallback",passport.authenticate("github",{failureRedirect:"/faillogin"}),async(req,res)=>{
    createObjCooke(req)
    res.redirect("/")
})

auth.get("/google",passport.authenticate("google",{scope:["profile"]}),async(req,res)=>{})

auth.get("/google/callback",passport.authenticate("google",{failureRedirect:"/"}),async(req,res) =>{
    console.log("holamudno",req.user,req.firts_name)
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
        res.status(500).json({message:"Internal Server Error"})
   }
})
export default auth