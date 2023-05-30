import { Router } from "express";
import config from "../config/index.js";

const realTime = Router()

const {port} = config

realTime.get("/",(req,res)=>{

    res.render("realTimeProducts.handlebars")

})

export default realTime