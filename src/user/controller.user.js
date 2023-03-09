import { Router } from "express";
import UserClass from "../dao/user.dao.js";

const user = Router()
const instanceUser = new UserClass()

user.get("/destroy",(req,res)=>{
    req.session.destroy(err =>{
        if(!err) return  res.redirect("/")
        return res.status(500).send({error:err})
    })
})

user.post("/login",async(req,res)=>{
    const {email,password} = req.body
    const get = await instanceUser.getUser({email,password})
    console.log("a",get)
    if(!get)return res.status(400).json({message:"El usuario y la contraseña no coinciden"})
    req.session.user ={...get}
    res.redirect("/api/products")
     /*  res.redirect("/api/products") */
    
   /*  res.status(200).json({message:"Logeado"}) */
})

user.post("/",(req,res)=>{
    const {firts_name,last_name,email,password} = req.body
    const post = instanceUser.postUser({firts_name,last_name,email,password})
    if(!post) return res.status(403).json({message:"El correo ya existe"})
    res.status(201).json({message:"Se creo el usuario con exito"})
})


export default user