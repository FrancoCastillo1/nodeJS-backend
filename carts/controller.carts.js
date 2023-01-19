import { Router } from "express";
import fs from "fs/promises"
import instancia from "../ProductManager-Database/ProductManager.js";
const cart = Router()
cart.post("/",async(req,res) =>{
    const leer = await fs.readFile("./cart.json","utf-8")
    const pasarJSON = JSON.parse(leer)
    console.log(pasarJSON)
    console.log(pasarJSON.length)
    const newCarrito = {id: pasarJSON.length ==0?1:pasarJSON.length + 1,products:[]}
    const convertirS = JSON.stringify(newCarrito)
    await fs.appendFile("./cart.json",convertirS)
    res.send("El carrito fue generado satisfactoreamente")
})
cart.get("/:cid",async(req,res) =>{
    const {cid} = req.params
    const leer = await fs.readFile("./cart.json","utf-8")
    const pasarJSON = JSON.parse(leer)
    const buscarCart = pasarJSON.find((pro) => pro.id == cid )
    if(buscarCart) return  res.status(404).send("No se el id del carrito")
    return res.json({products:buscarCart.products })
})
cart.post("/:cid/products/:pid",async(req,res) =>{
    const {cid,pid} = req.params
    const leer = await fs.readFile("./cart.json","utf-8")
    const pasarJSON = JSON.parse(leer)
    const leerProducts = await instancia.getProductsById(pid)
    const buscarCart = pasarJSON.findIndex((pro) => pro.id == cid)
    const cart = pasarJSON.at(buscarCart)
    console.log("b", cart)
    if(buscarCart == -1 || !leerProducts) return res.status(404).send("No se el id del carrito o del producto")

    const verProductID = cart.products.findIndex((pro) => pro.id ==pid )
    const verProduct = cart.products[verProductID]
    const newQuankity = {id:leerProducts.id,quankity:verProduct?verProduct.quankity +=1:1}
    verProduct ? cart.products.splice(verProductID,1,newQuankity):cart.products.push({id:leerProducts.id,quankity: 1})
    pasarJSON.splice(buscarCart,1,cart)
    const convertirJSON = JSON.stringify(pasarJSON)
    await fs.writeFile("./cart.json",convertirJSON)
})
export default cart