import { Router } from "express";
import passportCall from "../utlis/passportCallback.js";
import authorizationJWT from "../middlewares/authorization.jwt.js";

const admin = Router()

admin.get("/private",passportCall("current"),authorizationJWT("admin"),(req,res)=>{
    //primer middleware gestiona errores de la estrategia de passport generada en su inicialize
    //segunda evalua roles, como es ruta protegida podes tener tu jwt pero no un rol de admin
    res.json({message:"authenticate"})
})

export default admin