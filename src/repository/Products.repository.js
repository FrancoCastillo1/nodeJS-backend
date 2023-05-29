import ProductDTO from "../DTOs/Product.dto.js"
import CustomError from "../utlis/error/CustomError.js"
import { EnumError,EnumNameError } from "../utlis/error/enum.error.js"
import {generateDocument} from "../utlis/error/info.error.js"
import UserClass from "../DAO/mongo/user.dao.js"
import mongoose from "mongoose"

class ProductsRepository{
    constructor(dao){
        this.dao = dao
        this.user = new UserClass()
    }
    async getProduct(limit,sortP ,page,query){
       try{
        if (limit || sortP || page || typeof query == "object") return await this.dao.getProductByQuery(limit,sortP,page,query)
        return await this.dao.getProducts()
       }catch(err){
            throw new Error(err)
       }
    }

    async getProductsId(pid){
        try{
            const id = mongoose.Types.ObjectId(pid)
            console.log(id)
          return  await this.dao.getProductsId(id)
        }catch(err){
            throw new Error(err)
        }
    }
    async getProductByKey(key,value){
        const idValidacion = await this.getProductsId("6420cb9857732e975d76ef30")
        const keysValidation = [...Object.keys(idValidacion),"id","owner"]
        const encontrarKey = keysValidation.find(item => item == key)
        if(!encontrarKey) return ["no existe la key",false,404]
        try{
            return await this.dao.getProductByKey(key,value)
        }catch(err){
            throw new Error(err)
        }
    }

    async addProducts(obj,email){
        let validate = true
        console.log("parece que la wea funciona")
        try{
            const userMail = await this.user.getUser({email,})
            if(userMail.rol != "premium" && userMail.rol != "admin") return ["no podes crear productos si sos usuario",false,403]

            obj.creator.id = userMail._id.toString()
            obj.creator.owner = userMail.rol

            const productDto = new ProductDTO(obj)
            const arrayValues = Object.values(productDto)
            const arrayKeys = Object.keys(productDto)

            if(arrayValues.at(-1) == false) return ["El estatus del producto no existe",false,403];

            arrayValues.length = 5
            arrayKeys.length = 5

            const validaciones = [5,13,1,1,4]
            const arrayValidaciones = []
            
            for(let i =0;i<arrayValues.length;i++){
                if(typeof arrayValues[i] == "number"){
                    let string = arrayValues[i].toString()
                    arrayValues[i] = string
                }
                if(arrayValues[i].length < validaciones[i]){
                    validate && (validate = false)
                    arrayValidaciones.push({propiedad:arrayKeys[i],valor:arrayValues[i],longitudMinima:validaciones[i]})
                    CustomError.createError({
                        name:EnumNameError.INVALID_CREDENTIALS_PRODUCTS,
                        cause:generateDocument({cartId,}),
                        code:EnumError.INVALID_LENGTH_ERROR,
                    })
                }
            }

            let propertiesNotTestString;
             arrayValidaciones.forEach(item =>{
                propertiesNotTestString += `
                La propiedad ${item.propiedad} cuyo valor ${item.valor} no cumple con los ${item.longitudMinima} caráteres minimos establecidos\n`
            })

            if(!validate) return [`Se debe cumplir con la longitud minima para continuar:${propertiesNotTestString}`,false,400]

            return  await this.dao.addProducts(productDto)
        }catch(error){
            throw new Error(e)
        }
    }
    async updateProducts(pid,update,valueUpDate){
        try{
           return  await this.dao.updateProducts(pid,update,valueUpDate)
        }catch(e){
            throw new Error(e)
        }
    }
   async deleteProductsById(pid,email){
    const productId = await this.getProductsId(pid)
    const userMail = await this.user.getUser({email,}) /*recuerda hacer un middleware de esto con upDate */

    if(userMail.rol != "premium" && userMail.rol != "admin") return ["no podes eliminar productos si sos usuario",false,403]
    if(!productId) return ["No existe el producto",false,404]

    if(productId.creator.id.toString() !== userMail._id.toString() && userMail.rol !== "admin") return ["No podes eliminar productos que no son tuyos",false,403]

    try{
        return await this.dao.deleteProductsId(pid)
    }catch(err){
        throw new Error(err)
    }
   }
}

export default ProductsRepository