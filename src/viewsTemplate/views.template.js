import { Router } from "express";
import  barril from "../middlewares/index.js"

const viewsTemplates = Router()

const {sessionExist,notSession} = barril

viewsTemplates.get("/",sessionExist,(req,res) =>{
    res.render("login.handlebars")
})

viewsTemplates.get("/register",sessionExist,(req,res)=>{
    res.render("register.handlebars")
})

viewsTemplates.get("/logout",notSession,(req,res)=>{
    console.log("xsd",req.session)
    res.render("logout.handlebars")
})


export default viewsTemplates