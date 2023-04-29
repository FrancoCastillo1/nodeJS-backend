import { Router } from "express";
import generateRandomProducts from "../utlis/mock.js"

const moking = Router()

moking.get("/",(req,res) =>{
    const mockProducts = generateRandomProducts()
    res.json({message:mockProducts})
})

export default moking