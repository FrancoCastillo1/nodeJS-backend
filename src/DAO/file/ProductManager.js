import fs from "fs/promises";
import __dirname from "../../utilis.js";
class ProductManager{
    constructor (){
        this.ruta = `${__dirname}/express.json`
        this.products = []
    }
    async getProducts(){
      try{
          const leer = await fs.readFile(`${this.ruta}`,"utf-8") 
          let pasarJson = JSON.parse(leer)
          return pasarJson
      }catch(e){
        return {message:e}
      }  
     }
    async addProduct({title,description,price,thumbnail= "Sin i",stock,category,status = true }){
       const get =await this.getProducts()
       const estatus = Boolean(status)
       const stockTotal = Number(stock)
        const precio = Number(price)
        if((title.length <3 || description.length <10 || precio.length <1 || stockTotal.length <1 ||  estatus == false  || category.length < 11))return false ;
            if(leer){
             let id=  get.at(-1).id +=1 
             this.products.push({title,description,price:precio,thumbnail,stock:stockTotal,id,category,status:estatus})
            }else{
                let id = 1
                this.products.push({title,description,price:precio,thumbnail,stock:stockTotal,id,category,status:estatus})
            }
            const convertir = JSON.stringify(...this.products)
            try{
                await fs.writeFile(`${__dirname}/express.json`,convertir)
                return get.at(-1).id +=1 
            }catch(e){
                console.error("No se pudo registrar, hubo un error en",e)
            }
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

export default ProductManager