import ProductDTO from "../DTOs/Product.dto.js"
import CustomError from "../utlis/error/CustomError.js"
import { EnumError,EnumNameError } from "../utlis/error/enum.error.js"
import {generateDocument} from "../utlis/error/info.error.js"
import UserClass from "../DAO/mongo/user.dao.js"

class ProductsRepository{
    constructor(dao){
        this.dao = dao
        this.user = new UserClass()
    }
    async getProduct(limit,sortP ,page,query){
       try{
            return  await this.dao.getProduct(limit,sortP,page,query)
       }catch(err){
            throw new Error(err)
       }
    }

    async getProductsId(id){
        try{
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
        try{
            const userMail = await this.user.getUser({email,})
            if(userMail.rol != "premium" && userMail.rol != "admin") return ["no podes crear productos si sos usuario",false,403]

            obj.creator.id = userMail._id.toString()
            obj.creator.owner = userMail.rol

            const productDto = new ProductDTO(obj)
            const array = Object.values(productDto)

            if(array.at(-1) == false) return ["El estatus del producto no existe",false,403];
            array.length = 5

            const validaciones = [5,13,1,1,4]
        
        
            for(let i =0;i<array.length;i++){
                if(typeof array[i] == "number"){
                    let string = array[i].toString()
                    array[i] = string
                }
                if(array[i].length < validaciones[i]){
                    validate = false
                    CustomError.createError({
                        name:EnumNameError.INVALID_CREDENTIALS_PRODUCTS,
                        cause:generateDocument({cartId,}),
                        code:EnumError.INVALID_LENGTH_ERROR,
                    })
                    break
                }
            }
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
    const userMail = await this.user.getUser({email,})

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