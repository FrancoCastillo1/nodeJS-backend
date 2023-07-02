import { Router } from "express";
import postTiket from "../service/ticket.service.js";

const ticket = Router()

ticket.post("/",async(req,res) =>{
    const {cid} = req.body
    const {email} = req.user
    try{
        const theTicket = await postTiket(cid,email)

        theTicket[1] == undefined && (theTicket[1] = true)

        if(!theTicket[1]) return res.status(theTicket[2]).json({message:theTicket[0]})
        res.status(201).json({message:theTicket})
    }catch(err){
        console.log("este",err)
        res.json({message:err,error:true})
    }
})

export default ticket