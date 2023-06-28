import { Router } from "express";
import passportCall from "../utlis/passportCallback.js";
import authorizationJWT from "../middlewares/authorization.jwt.js";

const admin = Router()

admin.get("/private",passportCall("current"),authorizationJWT("admin"),(req,res)=>{
    res.json({message:"authenticate"})
})

export default admin