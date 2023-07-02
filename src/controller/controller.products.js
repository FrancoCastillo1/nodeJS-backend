import { Router } from "express";
import authorizationJWT from "../middlewares/authorization.jwt.js";
import productsService from "../repository/product.index.js";
import  socketIo from "socket.io-client";
import config from "../config/index.js";
import { seePermissions } from "../middlewares/products.middleware.js";

const {port} = config

const products = Router()
const socket = socketIo(`http://localhost:${port}`);


products.get("/",async(req,res)=>{
    const {sort,query,limit,page} = req.query
    try{
      const products = await productsService.getProducts(limit,sort,page,query)
      console.log("este",products)
      products[1] == undefined &&(products[1] = true)
      if(!products[1]) return res.status(products[2]).json({message:products[0]})
      res.render("home.handlebars",{products,})
    }catch(err){
      res.status(500).json({error:true,message:err})
    }
})
products.get("/:id",async(req,res)=>{
    const {id} = req.params
    console.log(id,"pasrte")
    try{
      const producto = await productsService.getProductsId(id)
       if(!producto) return  res.status(404).json({message:`no existe el id ${id} en la base de datos`})
       return res.status(200).json({payload:producto}) 
    }catch(err){
        res.json({error:true,message:err})
    }
})
products.post("/",async(req,res) =>{
  const {email} = req.user
  try{
    const agregar = await productsService.addProducts(req.body,email)
    agregar[1] == undefined &&(agregar[1] = true)
    if(!agregar[1]) return res.status(agregar[2]).json({message:agregar[0]})
    socket.emit('actualizar', true);
    res.status(201).json({message:"Se agrego el producto correctamente",content:agregar})
  }catch(err){
    res.status(500).json({error:true,message:err})
  }
})
products.patch("/:id",seePermissions,async(req,res) =>{
    const {id} = req.params
    const {actualizar,info} = req.body
    try{
      const actualizarPro = await productsService.updateProducts({id,actualizar,info})
      socket.emit('actualizar', true);
      if(!actualizarPro) return res.status(404).json({message:"No se encontro la clave"})
      res.status(200).json({message:"El producto se actualizo correctamente"})
    }catch(err){
        res.status(500).json({error:true,message:err})
    }
})
products.delete("/:id",seePermissions,async(req,res) =>{
  const {id} = req.params
  const {email} = req.user
  try{
    const deletePro = await productsService.deleteProductsById(id,email)
    deletePro[1] == undefined && (deletePro[1] = true)
    if(!deletePro[1]) return  res.status(deletePro[2]).json({message:deletePro[0]})
    socket.emit('actualizar', true);
    res.status(204).json({message:`El producto ${id} se elimino satisfactoriamente`})
  }catch(err){
      res.status(500).json({error:true,message:err})
  }
})
export default products