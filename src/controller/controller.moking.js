import { Router } from "express";
import generateRandomProducts from "../utlis/mock.js"

const moking = Router()

moking.get("/",(req,res) =>{
    const mockProducts = generateRandomProducts()
    res.status(200).json({message:mockProducts})
})

export default moking