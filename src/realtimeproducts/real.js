import { Router } from "express";
const real = Router()
real.get("/",(req,res)=>{
    res.render("realtimeProducts")
})
export default real