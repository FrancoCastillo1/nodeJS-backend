import { Router } from "express";
import sessionExist from "../middlewares/sessionExist.js"
import notSession from "../middlewares/notsession.js"
/* import  barril from "../middlewares/index.js" */

const viewsTemplates = Router()

/* const {sessionExist,notSession} = barril */

viewsTemplates.get("/",sessionExist,(req,res) =>{
   /*  console.log("djdipd",req.session.user) */
    res.render("login.handlebars")
})

viewsTemplates.get("/register",sessionExist,(req,res)=>{
    res.render("register.handlebars")
})

viewsTemplates.get("/logout",notSession,(req,res)=>{
    res.render("logout.handlebars")
})


export default viewsTemplates