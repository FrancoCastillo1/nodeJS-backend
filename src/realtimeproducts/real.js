/* import { Router } from "express";
import ProductManager from "../DAO/file/ProductManager.js";

const real = Router()
const productsInstance = new ProductManager()
real.get("/",async(req,res)=>{
    const {sort,query,limit,page} = req.query
    const products = await productIntance.getProduct(limit,sort,page,query)
    res.render("home",{products,})
})
real.post("/",async(req,res)=>{
    const {title,description,price,stock,status,category,thumbails} = req.body
    const agregar = await productsInstance.addProducts({title,description,price,thumbails,stock,category,status})
    if(!agregar) return res.status(403).send("Por favor llena los campos requeridos")
    return res.json({payload:agregar})
})
export default real */