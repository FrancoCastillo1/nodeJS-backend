import { Router } from "express";
/* import sessionExist from "../middlewares/sessionExist.js"
import notSession from "../middlewares/notsession.js" */
/* import  barril from "../middlewares/index.js" */

const viewsTemplates = Router()

/* const {sessionExist,notSession} = barril */

viewsTemplates.get("/createnewpassword",(req,res)=>{
    res.render("restablecer.handlebars")
})

viewsTemplates.get("/restorepasswordrender",(req,res)=>{
    res.render("introducirCorreo.handlebars")
})

viewsTemplates.get("/"/* sessionExist, */,(req,res) =>{
    res.render("login.handlebars")
})

viewsTemplates.get("/register",(req,res)=>{
    res.render("register.handlebars")
})

viewsTemplates.get("/logout"/* ,notSession */,(req,res)=>{
    res.render("logout.handlebars")
})


export default viewsTemplates