import { Router } from "express";
import passportCall from "../utlis/passportCallback.js";

const session = Router()

/* session.get("/current",passportCall("current"),(req,res) =>{
    res.json({message:`JWT: ${req.cookies["authToken"]}`})
}) */

export default session