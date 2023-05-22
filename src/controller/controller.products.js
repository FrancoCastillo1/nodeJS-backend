import { Router } from "express";
/* import addProducts from "../service/products.service.js"; */
/* import instancia from "../dao/ProductManager.js"; */
import ProductManager from "../DAO/mongo/product.dao.js"
import barril from "../middlewares/index.js";
import ProductDTO from "../DTOs/Product.dto.js";
import authorizationJWT from "../middlewares/authorization.jwt.js";
import productsService from "../repository/product.index.js";
/* import Products from "../DAO/mongo/models/products.model.js"; */

const products = Router()
/* const productIntance = new ProductManager() */

const {notSession} = barril


products.get("/",async(req,res)=>{
    const {sort,query,limit,page} = req.query
    const products = await productsService.getProduct(limit,sort,page,query)
    res.render("home.handlebars",{products})
})
products.get("/:id",async(req,res)=>{
    const {id} = req.params
   const producto = await productsService.getProductsId(id)
    if(!producto) return  res.status(404).json({message:`no existe el id ${id} en la base de datos`})
    return res.json({producto,}) 
})
products.post("/"/* ,passportCall("current"),authorizationJWT("admin") */,async(req,res) =>{
 /*   const {title,description,price,stock,status,category,thumbails} = req.body */
  const {email} = req.user
   const agregar = await productsService.addProducts(req.body,email)
   agregar[1] == undefined &&(agregar[1] = true)
   if(!agregar[1]) return res.status(agregar[2]).json({message:agregar[0]})
   return res.json({message:"Se agrego el producto correctamente"})
})
products.patch("/:id",authorizationJWT("admin"),async(req,res) =>{
    const {id} = req.params
    const {actualizar,info} = req.body
    const actualizarPro = await productsService.updateProducts({id,actualizar,info})
    if(!actualizarPro) return res.status(404).json({message:"No se encontro la clave"})
    res.json({message:"El producto se actualizo correctamente"})
})
products.delete("/:id",async(req,res) =>{
  const {id} = req.params
  const {email} = req.user
  const deletePro = await productsService.deleteProductsById(id,email)
  deletePro[1] == undefined &&(deletePro[1] = true)
  if(!deletePro[1]) return  res.status(deletePro[2]).json({message:deletePro[0]})
  res.json({message:`El producto ${pid} se elimino satisfactoriamente`})
})
export default products