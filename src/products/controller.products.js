import { Router } from "express";
import instancia from "../dao/ProductManager.js";
/* import socketF from "../public/js/index.js"; preguntar sobre sockets*/
const products = Router()

products.get("/",async(req,res)=>{
    let limite = req.query.limit
    const limitN = Number(limite)
    const acceder = await instancia.getProducts()
    if(limite){
        const extraer = acceder.slice(0,limitN)
        res.render("home",{products:extraer})
    }
    res.render("home",{products:acceder})
})
products.get("/:id",async(req,res)=>{
    const {id} = req.params
   const producto = await instancia.getProductsById(id)
    if(!producto) return  res.send({message:`no existe el id ${id} en la base de datos`})
    return res.send(producto) 
})
products.post("/",async(req,res) =>{
   const {title,description,price,stock,status,category,thumbails} = req.body
   const agregar = await instancia.addProduct({title,description,price,thumbails,stock,category,status})
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