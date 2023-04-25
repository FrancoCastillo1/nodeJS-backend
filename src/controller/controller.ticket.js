import { Router } from "express";
import postTiket from "../service/ticket.service.js";

const ticket = Router()

ticket.post("/",async(req,res) =>{
    const {cid} = req.body
    try{
        const postTicket = await postTiket(cid)
        console.log("aca",postTicket)
        res.status(201).json({message:postTicket})
    }catch(err){
        res.json({message:"Internal server error"})
    }
})

export default ticket