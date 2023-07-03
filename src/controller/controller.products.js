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
    const {firts_name,last_name} = req.user
    try{
      const products = await productsService.getProducts(limit,sort,page,query)
      products[1] == undefined &&(products[1] = true)
      if(!products[1]) return res.status(products[2]).json({message:products[0]})

      res.render("home.handlebars",{products,user:{firts_name,last_name}})
    }catch(err){
      res.status(500).json({message:typeof err == "object"?"Internal Server Error":err,error:true})
    }
})
products.get("/:id",async(req,res)=>{
    const {id} = req.params
    try{
      const producto = await productsService.getProductsId(id)
       if(!producto) return  res.status(404).json({message:`no existe el id ${id} en la base de datos`})
       return res.status(200).json({payload:producto}) 
    }catch(err){
        res.status(500).json({message:typeof err == "object"?"Internal Server Error":err,error:true})
    }
})
products.post("/",async(req,res) =>{
  const {auth_ide} = req.user
  req.site = "products"
  try{
    const agregar = await productsService.addProducts(req.body,auth_ide)
    agregar[1] == undefined &&(agregar[1] = true)
    if(!agregar[1]) return res.status(agregar[2]).json({message:agregar[0]})
    socket.emit('actualizar', true);
    res.status(201).json({message:"Se agrego el producto correctamente",content:agregar})
  }catch(err){
    res.status(500).json({message:typeof err == "object"?"Internal Server Error":err,error:true})
  }
})
products.patch("/:id",seePermissions,async(req,res) =>{
    const {id} = req.params
    const {actualizar,info} = req.body
    const {rol} = req.user
    try{
      const actualizarPro = await productsService.updateProducts(id,actualizar,info,rol)
      socket.emit('actualizar', true);
      if(!actualizarPro) return res.status(404).json({message:"No se encontro la clave"})
      res.status(200).json({message:"El producto se actualizo correctamente"})
    }catch(err){
        res.status(500).json({message:typeof err == "object"?"Internal Server Error":err,error:true})
    }
})
products.delete("/:id",seePermissions,async(req,res) =>{
  const {id} = req.params
  const {auth_ide} = req.user
  try{
    const deletePro = await productsService.deleteProductsById(id,auth_ide)
    socket.emit('actualizar', true);
    if(!deletePro) return res.status(404).json({message:"No se encontró el producto"})
    res.status(200).json({message:`El producto ${id} se elimino satisfactoriamente`})
  }catch(err){
      res.status(500).json({message:typeof err == "object"?"Internal Server Error":err,error:true})
  }
})
export default products