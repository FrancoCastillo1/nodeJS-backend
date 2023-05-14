import { Router } from "express";
/* import addProducts from "../service/products.service.js"; */
/* import instancia from "../dao/ProductManager.js"; */
import ProductManager from "../DAO/mongo/product.dao.js"
import barril from "../middlewares/index.js";
import ProductDTO from "../DTOs/Product.dto.js";
import passportCall from "../utlis/passportCallback.js";
import authorizationJWT from "../middlewares/authorization.jwt.js";
import productsService from "../repository/product.index.js";
/* import Products from "../DAO/mongo/models/products.model.js"; */

const products = Router()
/* const productIntance = new ProductManager() */

const {notSession} = barril


products.get("/",/* ,notSession, */async(req,res)=>{
    const {sort,query,limit,page} = req.query
    const products = await productsService.getProduct(limit,sort,page,query)
    /* const {user} = req.session */
    req.logger.info(user)
    res.render("home.handlebars",{products,user})
})
products.get("/:id",/* notSession */async(req,res)=>{
    const {id} = req.params
   const producto = await productsService.getProductsId(id)
    if(!producto) return  res.status(404).send({message:`no existe el id ${id} en la base de datos`})
    return res.json({producto,}) 
})
products.post("/"/* ,passportCall("current"),authorizationJWT("admin") */,async(req,res) =>{
 /*   const {title,description,price,stock,status,category,thumbails} = req.body */
   const agregar = await productsService.addProducts(req.body)
   if(!agregar) return res.status(403).send("Por favor llena los campos requeridos")
   return res.json({message:"Se agrego el producto correctamente"})
})
products.patch("/:id",passportCall("current"),authorizationJWT("admin"),async(req,res) =>{
    const {id} = req.params
    const {actualizar,info} = req.body
    const actualizarPro = await productsService.updateProducts({id,actualizar,info})
    if(!actualizarPro) return res.status(404).send("No se encontro la clave")
    res.send("El producto se actualizo correctamente")
})
products.delete("/:id",passportCall("current"),authorizationJWT("admin"),async(req,res) =>{
  const {id} = req.params
  const deletePro = await productIntance.deleteProduct({id})
  if(!deletePro) return  res.status(404).send("No se el id del producto")
  res.send("El producto se elimino satisfactoriamente")
})
export default products