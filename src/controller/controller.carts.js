import { Router } from "express";
import {postProduct,patchProducts,generateNewCart,corroborateQuery,getCartById,deleteCart,deleteProductCart} from "../service/cart.service.js"
import {seeIdCart, validateCid} from "../middlewares/cart.middleware.js" 
import passportCall from "../utlis/passportCallback.js";
import authorizationJWT from "../middlewares/authorization.jwt.js";

const cart = Router()

cart.get("/",passportCall("current"),authorizationJWT("admin"),async(req,res)=>{
    let {limit,page,sort,query} = req.query

    try{
        const get = await corroborateQuery(limit,page,sort,query)
        get[1] == undefined && (get[1] = true)
        if(!get[1]) return res.status(403).json({message:get[0]})
        return res.status(200).json({payload:get})
    }catch(err){
        res.status(500).json({message:err ?? "Internal server error",error:true})
    }
})

cart.post("/",async(req,res) =>{
    const {auth_ide} = req.user
    try{
        const addToCart = await generateNewCart(auth_ide)
        addToCart[1] == undefined && (addToCart[1] = true)
        if(!addToCart[1]) return res.status(addToCart[2]).json({message:addToCart[0]})
        return res.status(201).json({message:`se creo el carrito correctamente, el id es ${addToCart}`,payload:addToCart})
    }catch(err){
        res.status(500).json({message:err ?? "Internal server error",error:true})
    }

})

cart.get("/:cid",validateCid,seeIdCart,async(req,res) =>{
    const {cid} = req.params
    try{
        const buscarCart = await getCartById(cid)
         if(!buscarCart) return  res.status(404).send("No se el id del carrito")
         return res.status(200).json({cart:buscarCart})
    }catch(err){
        res.status(500).json({message:err ?? "Internal server error",error:true})
    }
})
cart.post("/:cid/products/:pid",validateCid,seeIdCart,async(req,res) =>{
    const {cid,pid} = req.params
    const {quankity} = req.body
    const {auth_ide} = req.user
    try{
        const newProduct = await postProduct(cid,pid,quankity,auth_ide)
        newProduct[1] == undefined && (newProduct[1] = true)
        if(!newProduct[1]) return res.status(newProduct[2]).json({message:newProduct[0]})
        return res.status(200).json({message:"Se añadio el producto al carrito"})
    }catch(err){
        res.status(500).json({message:err ?? "Internal server error",error:true})
    }
})

cart.patch("/:cid/products/:pid",validateCid,seeIdCart,async(req,res) =>{
    const {cid,pid} = req.params
    const {quankity} = req.body
    try{
        const newProduct = await patchProducts(cid,pid,quankity)

        newProduct[1] == undefined &&(newProduct[1] = true)

        if(!newProduct[1]) return res.status(newProduct[2]).json({message:newProduct[0]})
        return res.status(200).json({message:"Se actualizo la cantidad del producto",payload:{id:cid,quankity,}})

    }catch(err){
        res.status(500).json({message:err ?? "Internal server error",error:true})
    }
})

cart.delete("/:cid/products/:pid",validateCid,seeIdCart,async(req,res)=>{
    const {cid,pid} = req.params
    const {rol} = req.user
    try{
        const deleteP = await deleteProductCart(cid,pid,rol)

        deleteP[1] == undefined && (deleteP[1] = true)

        if(!deleteP[1]) return res.status(deleteP[2]).json({message:deleteP[0]})
        return res.status(200).json({message:"se elimino el producto correctamente"})
    }catch(err){
        res.status(500).json({message:err ?? "Internal server error",error:true})
    }
})

cart.delete("/:cid",validateCid,seeIdCart,async(req,res)=>{
    const {cid} = req.params
    const {rol} = req.user
    try{
        const deleteC = await deleteCart(cid,rol)

        if(!deleteC) return res.status(404).json({message:"No existe el id del carrito"})
        res.status(200).json({message:"se elimino el carrito"})
    }catch(err){
        res.status(500).json({message:err ?? "Internal server error",error:true})
    }
})

export default cart