import { Router } from "express";
import __dirname from "../utilis.js";
import instanceCart from "../persisit/cart.persisit.js";


const cart = Router()

const wordA = ["perro","gato","loro","animal"]

cart.param("word",(req,res,next,word)=>{ // creamos esto cuando hay mucho parametro repetido, por esto este middleware
    const searchword = wordA.find(wordI => wordI == word ) // esto simularía ser una base de datos
    const regex = /^[a-zA-Z0-9]+$/
    if(searchword && regex.test(searchword)) req.word = searchword
    else req.word = null // evaluo si cumple con la expresión
    next() // refactorizar o borrar luego
})

cart.get("/",async(req,res)=>{
    let {limit,page,sort,query} = req.query
    const get = await instanceCart.getCart(limit,sort,page,query)
    return res.json({payload:get})
})

cart.get("/:cid",async(req,res) =>{
    const {cid} = req.params
   const buscarCart = await instanceCart.getCartById(cid)
    console.log(buscarCart)
    if(!buscarCart) return  res.status(404).send("No se el id del carrito")
    return res.json({cart:buscarCart})
})

cart.post("/",(req,res)=>{
    const cart = instanceCart.postCart()
    if(!cart) return res.send("fallo en crearse el carrito")
    return res.send("Se creo el carrito correctamente")
})

cart.put("/:cid/products/:pid",async(req,res) =>{
    const {cid,pid} = req.params
    const {quankity} = req.body
    const newProduct = instanceCart.putAndPostCart(cid,pid,quankity)
    if(!newProduct) return res.status(404).send("Hubo un error en id del carrito o del producto")
    return res.send("se añadio el producto al carrito ")
})

cart.patch("/:cid/products/:pid",async(req,res) =>{
    const {cid,pid} = req.params
    const {quankity} = req.body
    const newProduct = instanceCart.patchProducts(cid,pid,quankity)
    if(!newProduct) return res.send("Hubo un error en id del carrito o del producto")
    return res.send("se actualizo la cantidad de ejemplares del producto")
})

cart.delete("/:cid/products/:pid",async(req,res)=>{
    const {cid,pid} = req.params
    const deleteP = await instanceCart.deleteProduct(cid,pid)
    if(!deleteP) return res.status(404).send("Hubo un error en id del carrito o del producto")
    return res.send("se elimino el producto correctamente")
})

cart.delete("/:cid",async(req,res)=>{
    const {cid} = req.params
    const deleteC = await instanceCart.deleteCart(cid)
    if(!deleteC) return res.status(404).send("No existe el id del carrito")
    res.send("se elimino el carrito ")
})

export default cart