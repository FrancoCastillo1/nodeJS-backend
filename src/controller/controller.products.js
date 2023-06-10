import { Router } from "express";
import authorizationJWT from "../middlewares/authorization.jwt.js";
import productsService from "../repository/product.index.js";
import  socketIo from "socket.io-client";
import config from "../config/index.js";

const {port} = config

const products = Router()
const socket = socketIo(`http://localhost:${port}`);


products.get("/",async(req,res)=>{
    const {sort,query,limit,page} = req.query
    try{
      const products = await productsService.getProduct(limit,sort,page,query)
      res.render("home.handlebars",{products,})
    }catch(err){
      res.json({error:true,message:err})
    }
})
products.get("/:id",async(req,res)=>{
    const {id} = req.params
    console.log(id,"pasrte")
    try{
      const producto = await productsService.getProductsId(id)
       if(!producto) return  res.status(404).json({message:`no existe el id ${id} en la base de datos`})
       return res.json({producto,}) 
    }catch(err){
        res.json({error:true,message:err})
    }
})
products.post("/",async(req,res) =>{
  const {email} = req.user
  console.log(email)
  try{
    const agregar = await productsService.addProducts(req.body,email)
    agregar[1] == undefined &&(agregar[1] = true)
    if(!agregar[1]) return res.status(agregar[2]).json({message:agregar[0]})
    socket.emit('actualizar', true);
    res.status(201).json({message:"Se agrego el producto correctamente",content:agregar})
  }catch(err){
    res.json({error:true,message:err})
  }
})
products.patch("/:id",async(req,res) =>{
    const {id} = req.params
    const {actualizar,info} = req.body
    try{
      const actualizarPro = await productsService.updateProducts({id,actualizar,info})
      socket.emit('actualizar', true);
      if(!actualizarPro) return res.status(404).json({message:"No se encontro la clave"})
      res.json({message:"El producto se actualizo correctamente"})
    }catch(err){
        res.json({error:true,message:err})
    }
})
products.delete("/:id",async(req,res) =>{
  const {id} = req.params
  const {email} = req.user
  try{
    const deletePro = await productsService.deleteProductsById(id,email)
    deletePro[1] == undefined && (deletePro[1] = true)
    if(!deletePro[1]) return  res.status(deletePro[2]).json({message:deletePro[0]})
    socket.emit('actualizar', true);
    res.json({message:`El producto ${id} se elimino satisfactoriamente`})
  }catch(err){
      res.json({error:true,message:err})
  }
})
export default products