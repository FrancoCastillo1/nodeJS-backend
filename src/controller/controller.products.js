import { Router } from "express";
/* import addProducts from "../service/products.service.js"; */
/* import instancia from "../dao/ProductManager.js"; */
import ProductManager from "../DAO/mongo/product.dao.js"
import barril from "../middlewares/index.js";
import authorizationJWT from "../middlewares/authorization.jwt.js";
import productsService from "../repository/product.index.js";
/* import Products from "../DAO/mongo/models/products.model.js"; */

const products = Router()
/* const productIntance = new ProductManager() */

const {notSession} = barril


products.get("/",async(req,res)=>{
    const {sort,query,limit,page} = req.query
    try{
      const products = await productsService.getProduct(limit,sort,page,query)
      res.render("home.handlebars",{products})
    }catch(err){
      res.json({message:err})
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
        res.json({message:err})
    }
})
products.post("/"/* ,passportCall("current"),authorizationJWT("admin") */,async(req,res) =>{
  const {email} = req.user
  try{
    const agregar = await productsService.addProducts(req.body,email)
    agregar[1] == undefined &&(agregar[1] = true)
    if(!agregar[1]) return res.status(agregar[2]).json({message:agregar[0]})
    return res.json({message:"Se agrego el producto correctamente"})
  }catch(err){
    res.json({message:err})
  }
})
products.patch("/:id",authorizationJWT("admin"),async(req,res) =>{
    const {id} = req.params
    const {actualizar,info} = req.body
    try{
      const actualizarPro = await productsService.updateProducts({id,actualizar,info})
      if(!actualizarPro) return res.status(404).json({message:"No se encontro la clave"})
      res.json({message:"El producto se actualizo correctamente"})
    }catch(err){
        res.json({message:err})
    }
})
products.delete("/:id",async(req,res) =>{
  const {id} = req.params
  const {email} = req.user
  try{
    const deletePro = await productsService.deleteProductsById(id,email)
    deletePro[1] == undefined &&(deletePro[1] = true)
    if(!deletePro[1]) return  res.status(deletePro[2]).json({message:deletePro[0]})
    res.json({message:`El producto ${pid} se elimino satisfactoriamente`})
  }catch(err){
      res.json({message:err})
  }
})
export default products