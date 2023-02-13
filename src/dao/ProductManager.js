import fs from "fs/promises";
import __dirname from "../utilis.js";
import { io } from "socket.io-client";
const leer = await fs.readFile(`${__dirname}/express.json`,"utf-8") //porque me funcion asi retrocede una carpeta y teien que retroceder 2
let pasarJson = JSON.parse(leer)
const socket = io()
class ProductManager{
    constructor(){
        this.products = []
    }
    async addProduct({title,description,price,thumbnail= "Sin i",stock,category,status = true }){
       const estatus = Boolean(status)
       const stockTotal = Number(stock)
        const precio = Number(price)
        if((title.length <3 || description.length <10 || precio.length <1 || stockTotal.length <1 ||  estatus == false  || category.length < 11))return false ;
        else{
            if(leer){
             let id=  pasarJson.at(-1).id +=1 
             this.products.push({title,description,precio,thumbnail,stockTotal,id,category,estatus})
            }else{
                let id = 1
                this.products.push({title,description,precio,thumbnail,stockTotal,id,category,estatus} )
            }
            const convertir = JSON.stringify(...this.products)
            try{
                await fs.appendFile(`${__dirname}/express.json`,convertir)
                return true
            }catch(e){
                console.error("No se pudo registrar, hubo un error en",e)
            }
        }
    }
   async getProducts(){
       return pasarJson
    }
   async getProductsById(id){
       const buscar = pasarJson.find((item)=>item.id == id)
        if(!buscar) return;
        return buscar
    }
    async upDateProduct({id,actualizar,info}){
        console.log(id,actualizar)
        const buscar = pasarJson.findIndex((item)=>item.id == id)
        if(buscar == -1 )return false;
        const objetoUp = pasarJson.at(buscar)
        const comprobar = Object.keys(objetoUp).find((key) => key == actualizar)
        if(!comprobar)return false ;
        if(actualizar== "precio" || actualizar == "stockTotal"){
            info = Number(info)
        }
        objetoUp[actualizar] = info
        pasarJson.splice(buscar,1,objetoUp)
        const pasarJSON = JSON.stringify(pasarJson)
        await fs.writeFile(`${__dirname}/express.json`,pasarJSON)
        return true
    }
    async deleteProduct({id}){
        const buscar = pasarJson.findIndex((item)=>item.id == id)
        if(buscar === -1)return false ;
        pasarJson.splice(buscar,1)
        const convertir = JSON.stringify(pasarJson)
        await fs.writeFile(`${__dirname}/express.json`,convertir)
        return true
    }
}
const instancia = new ProductManager()
// desafio pasado(jueves 5/1/23)
/* async function parsearJson(){
    await instancia.addProduct({title:"producto de prueba",description:"Este es un producto prueba",price:200,thumbnail:"Sin imagen",code:"a38545",stock:25})
   await instancia.getProducts()
  await instancia.getProductsById(3)
  await instancia.upDateProduct(2,"stock",109)
  await instancia.deleteProduct(6)
} */
/* parsearJson() */
export default instancia