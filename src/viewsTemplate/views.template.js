import { Router } from "express";
import redirect from "../middlewares/redirect.js";

const viewsTemplates = Router()

viewsTemplates.get("/createnewpassword",(req,res)=>{
    res.render("restablecer.handlebars")
})

viewsTemplates.get("/restorepasswordrender",redirect("login","/api/products"),(req,res)=>{
    res.render("introducirCorreo.handlebars")
})

viewsTemplates.get("/",redirect("login","/api/products"),(req,res) =>{
    res.render("login.handlebars")
})

viewsTemplates.get("/register",redirect("login","/api/products"),(req,res)=>{
    res.render("register.handlebars")
})

viewsTemplates.get("/logout",(req,res)=>{
    res.render("logout.handlebars")
})

export default viewsTemplates