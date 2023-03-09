import { Router } from "express";
import instancia from "../dao/ProductManager.js";
import ProductManager from "../dao/product.dao.js";

const products = Router()
const productIntance = new ProductManager()

products.get("/",async(req,res)=>{
    const {sort,query,limit,page} = req.query
    const products = await productIntance.getProduct(limit,sort,page,query)
    const {user} = req.session
    console.log(user)
    console.log("wow",req.session ,"y",user)
    res.render("home.handlebars",{products,user})
})
products.get("/:id",async(req,res)=>{
    const {id} = req.params
   const producto = await productIntance.getProductsId(id)
    if(!producto) return  res.status(404).send({message:`no existe el id ${id} en la base de datos`})
    return res.json({producto,}) 
})
products.post("/",async(req,res) =>{
   const {title,description,price,stock,status,category,thumbails} = req.body
   const agregar = await productIntance.addProducts({title,description,price,thumbails,stock,category,status})
   if(!agregar) return res.status(403).send("Por favor llena los campos requeridos")
   return res.json({message:"Se agrego el producto correctamente"})
})
products.patch("/:id",async(req,res) =>{
    const {id} = req.params
    const {actualizar,info} = req.body
    const actualizarPro = await instancia.upDateProduct({id,actualizar,info})
    if(!actualizarPro) return res.status(404).send("No se encontro la clave")
    socketF(actualizarPro)
    res.send("El producto se actualizo correctamente")
})
products.delete("/:id",async(req,res) =>{
  const {id} = req.params
  const deletePro = await instancia.deleteProduct({id})
  if(!deletePro) return  res.status(404).send("No se el id del producto")
  res.send("El producto se elimino satisfactoriamente")
})
export default products