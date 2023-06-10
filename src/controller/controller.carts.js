import { Router } from "express";
import __dirname from "../utilis.js";
import instanceCart from "../DAO/mongo/cart.dao.js";
import {putAndPostCart,patchProducts} from "../service/cart.service.js"
import {seeIdCart} from "../middlewares/cart.middleware.js" 
import passportCall from "../utlis/passportCallback.js";
import authorizationJWT from "../middlewares/authorization.jwt.js";

const cart = Router()

const wordA = ["perro","gato","loro","animal"]

cart.param("word",(req,res,next,word)=>{ // creamos esto cuando hay mucho parametro repetido, por esto este middleware
    const searchword = wordA.find(wordI => wordI == word ) // esto simularía ser una base de datos
    const regex = /^[a-zA-Z0-9]+$/
    if(searchword && regex.test(searchword)) req.word = searchword
    else req.word = null // evaluo si cumple con la expresión
    next() // refactorizar o borrar luego
})

cart.get("/",passportCall("current"),authorizationJWT("admin"),async(req,res)=>{
    let {limit,page,sort,query} = req.query

    try{
        const get = await instanceCart.getCart(limit,sort,page,query)
        return res.json({payload:get})
    }catch(err){
        res.json({message:err})
    }
})

cart.post("/",async(req,res) =>{
    try{
        const addToCart = await instanceCart.postCart()
        return res.status(201).json({message:`se creo el carrito correctamente, el id es ${addToCart._id}`,payload:addToCart._id})
    }catch(err){
        res.status(500).json({error:err})
    }

})

cart.get("/:cid",seeIdCart,async(req,res) =>{
    const {cid} = req.params

    try{
        const buscarCart = await instanceCart.getCartById(cid)
         if(!buscarCart) return  res.status(404).send("No se el id del carrito")
         return res.json({cart:buscarCart})
    }catch(err){
        res.json({message:err})
    }
})
cart.put("/:cid/products/:pid",seeIdCart,async(req,res) =>{
    const {cid,pid} = req.params
    const {quankity} = req.body

    try{
        const newProduct = await putAndPostCart(cid,pid,quankity)
        newProduct[1] == undefined && (newProduct[1] = true)
        if(!newProduct[1]) return res.status(newProduct[2]).json({message:newProduct[0]})
        return res.json({message:"Se añadio el producto al carrito"})
    }catch(err){
        res.status(500).json({message:err})
    }
})

cart.patch("/:cid/products/:pid",seeIdCart,async(req,res) =>{
    const {cid,pid} = req.params
    const {quankity} = req.body
    try{
        const newProduct = await patchProducts(cid,pid,quankity)
        newProduct[1] == undefined &&(newProduct[1] = true)
        if(!newProduct[1]) return res.status(newProduct[2]).json({message:newProduct[0]})
        return res.status(200).json({message:"Se actualizo la cantidad del producto",payload:{id:cid,quankity,}})

    }catch(err){
        res.status(500).json({message:err})
    }
})

cart.delete("/:cid/products/:pid",seeIdCart,async(req,res)=>{
    const {cid,pid} = req.params
    try{
        const deleteP = await instanceCart.deleteProduct(cid,pid)
        console.log("llego???")
        if(!deleteP) return res.status(404).send("Hubo un error en id del carrito o del producto")
        return res.status(200).json({message:"se elimino el producto correctamente"})
    }catch(err){
        res.status(500).json({message:err,error:true})
    }
})

cart.delete("/:cid",seeIdCart,async(req,res)=>{
    const {cid} = req.params

    try{
        const deleteC = await instanceCart.deleteCart(cid)
        if(!deleteC) return res.status(404).send("No existe el id del carrito")
        res.status(200).json({message:"se elimino el carrito"})
    }catch(err){
        res.status(500).json({message:err,error:true})
    }
})

export default cart