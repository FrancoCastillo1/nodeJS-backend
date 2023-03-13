import { Router } from "express";
import passport from "passport";
import UserClass from "../dao/user.dao.js";
/* import { generateToken } from "../utlis/jwt.utilis.js"; */

const auth = Router()
const instanceUser = new UserClass()

auth.get("/destroy",(req,res)=>{
    req.session.destroy(err =>{
        if(!err) return  res.redirect("/")
        return res.status(500).send({error:err})
    })
})

auth.post("/login",passport.authenticate("login",{failureRedirect:"/faillogin"}),async(req,res)=>{
    if(!req.user) return res.status(400).json({message:"El correo y la contraseña no coiniden"})

    console.log("hola ",req.user)
    req.session.user = req.user

    res.json({status:"success", payload:req.user})
   /*  const {email,password} = req.body
    const token = generateToken(email)
    res.json({token}) */
})

auth.get("/faillogin",(req,res) =>{
    res.status(500).json({error:"Failed Login"})
})

auth.post("/",passport.authenticate("register",{failureRedirect:"/failregister"}),(req,res)=>{
    try{
      return res.status(201).json({message:"regsiter succesfull"})
    }catch(error){
        if(err.code == 1100)return res.json({message:"el usuario ya existe"})
        return res.status(500).json({error})
    }
  
})

auth.get("/failregister",(req,res)=>{
    res.status(500).message({message:"failed register"})
})

auth.get("/github",passport.authenticate("github",{scope:[`user:email`]}),async(req,res)=>{})

auth.get("/githubcallback",passport.authenticate("github",{failureRedirect:"/login"}),async(req,res)=>{
    console.log("xddd",req.user)
    req.session.user = req.user
    res.redirect("/")
})


export default auth