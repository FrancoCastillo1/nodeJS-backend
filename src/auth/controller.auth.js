import { Router } from "express";
import passport from "passport";
import UserClass from "../dao/user.dao.js";
import {generateToken} from "../utlis/jwt.utilis.js"
/* import { generateToken } from "../utlis/jwt.utilis.js"; */

const auth = Router()
const instanceUser = new UserClass()

const createObjCooke = (req) =>{
    console.log(req)
    const newObj = {
        firts_name:req.firts_name,
        last_name:req.last_name,
        email:req.email ?? "",
        googleId:req.googleId ?? "",
    }
    const token = generateToken(newObj)
    res.cookie("authToken",token) 
}

/* auth.get("/destroy",(req,res)=>{
    req.session.destroy(err =>{
        if(!err) return  res.redirect("/")
        return res.status(500).send({error:err})
    })
}) */

auth.post("/login",passport.authenticate("login",{failureRedirect:"/faillogin"}),async(req,res)=>{
    if(!req.user) return res.status(400).json({message:"El correo y la contraseña no coiniden"})
    createObjCooke(req)
    /* console.log("hola ",req.user)
    req.session.user = req.user */

    res.json({status:"success", payload:req.user})
   /*  const {email,password} = req.body
    const token = generateToken(email)
    res.json({token}) */
})

auth.get("/faillogin",(req,res) =>{
    console.log("paso por aca")
    res.status(500).json({error:"Failed Login:("})
})

auth.post("/",passport.authenticate("register",{failureRedirect:"/failregister"}),(req,res)=>{
    try{

      return res.status(201).json({message:"regsiter succesfull"})
    }catch(err){
        if(err.code == 11000)return res.json({message:"el usuario ya existe"})
        return res.status(500).json({error})
    }
  
})

auth.get("/failregister",(req,res)=>{
    res.status(500).message({message:"failed register"})
})

auth.get("/github",passport.authenticate("github",{scope:[`user:email`]}),async(req,res)=>{})

auth.get("/githubcallback",passport.authenticate("github",{failureRedirect:"/faillogin"}),async(req,res)=>{
    createObjCooke(req)
    res.redirect("/")
})

auth.get("/google",passport.authenticate("google",{scope:["profile"]}),async(req,res)=>{})

auth.get("/google/callback",passport.authenticate("google",{failureRedirect:"/"}),async(req,res) =>{
   try{
        const newObj = {
            firts_name:req.firts_name,
            last_name:req.last_name,
            googleId:req.googleId,
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