import ProductDTO from "../DTOs/Product.dto.js"
import CustomError from "../utlis/error/CustomError.js"
import { EnumError,EnumNameError } from "../utlis/error/enum.error.js"
import {generateDocument} from "../utlis/error/info.error.js"
import UserClass from "../DAO/mongo/user.dao.js"
import mongoose from "mongoose"
import { sendMailActionOfAdmnin } from "../service/mail.service.js"

class ProductsRepository{
    constructor(dao){
        this.dao = dao
        this.user = new UserClass()
    }
    async getProducts(limit,sortP ,page,query){
    let products;
    try{
        const productsCount = await this.dao.getProductsCount()
        let numberPage = page? Number(page):" "
        let numberLimit = limit?Number(limit):" "
        let numberSort = sortP? Number(sortP):" "

        if(!numberLimit || !numberPage || !numberSort) return ["Las querys limit,page,sort deben enviarse como numeros mayores a 0 ",false,400]   

        if(page <=0 || limit <=0) return ["No pueden haber limites o páginas menores a 0",false,400]
        if(numberPage > productsCount || numberLimit > productsCount) return [`Las páginas o limites no pueden ser mayores a los productos  ${productsCount} existentes`,false,400]
        if((typeof numberSort == "number") && (numberSort !== -1 && numberSort !== 1)) return ["La query sort solo acepta 1(ascendente) o -1(descendente)",false,400]
    
        numberLimit == " " && (numberLimit =10)
        numberSort == " " && (numberSort = -1)
        numberPage == " " && (numberPage = 1)
        
        if (limit || sortP || page || typeof query == "object"){
            products = await this.dao.getProductByQuery(numberLimit,numberSort,numberPage,query)

            const copy = [...products.docs]
            if(products.totalDocs == 0) return [`No hay ningún documento con tu ${query}`,false,404]
            products = copy
        }
        else   products=  await this.dao.getProducts()

        const map = products.map(item =>{
            delete item._v 
            delete item.creator
            return item._doc
        })

        return map
       }catch(err){
        logger.error(err)
           throw new Error(err)
       }
    }

    async getProductsId(pid){
        try{
            const id = mongoose.Types.ObjectId(pid)
            return  await this.dao.getProductsId(id)
        }catch(err){
            logger.error(err)
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
            logger.error(err)
            throw new Error(err)
        }
    }

    async addProducts(obj,auth_ide){
        let validate = true
        try{
            const userMail = await this.user.getUser({auth_ide,})
            const productUser = userMail.products_created
            const productUserRepeted = productUser.some(item => item.product.title == obj.title) 

            if(productUserRepeted) return ["No puedes agregar el mismo producto",false,400]

            if(userMail.rol != "premium") return [`no podes crear productos si sos ${userMail.rol == "user"?"usuario":"admin"}`,false,403]

            obj.creator = {}
            obj.creator.id = userMail._id
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
            arrayValidaciones.length > 0 && arrayValidaciones.forEach(item =>{
                propertiesNotTestString += `
                La propiedad ${item.propiedad} cuyo valor ${item.valor} no cumple con los ${item.longitudMinima} caráteres minimos establecidos\n`
            })

            if(!validate) return [`Se debe cumplir con la longitud minima para continuar:${propertiesNotTestString}`,false,400]

            const product =  await this.dao.addProducts(productDto)
            await this.user.pushArrayProperty(userMail._id,"products_created",{product:product._id})
            return product
        }
        catch(error){
            logger.error(error)
            throw new Error(error)
        }
    }
    async updateProducts(pid,update,valueUpDate,rol){
        const objId = mongoose.Types.ObjectId(pid);
        try{
            const upDate =   await this.dao.updateProducts(objId,update,valueUpDate)
            const user = await this.user.getUser({"products.product":pid})
            if(rol == "admin" && user.auth_ide.includes("@")){
                const text = `Hola ${user.firts_name} ${user.last_name} le informamos que nuestro equipo le ha actualizado el producto con el id ${pid}.Los cambios fueron en la propiedad ${update} donde el nuevo valor es ${valueUpDate}.Comuniquese con nuestro soporte en caso de haber sido una confusión`
                sendMailActionOfAdmnin(user.auth_ide,text)
            }
            return upDate
        }catch(e){
            logger.error(e)
            throw new Error(e)
        }
    }
    async deleteProductsById(pid,rol){
        const objId = mongoose.Types.ObjectId(pid);
        try{
            const deleteProduct =  await this.dao.deleteProductsId(objId)
            const user = await this.user.getUser({"products_created.product":pid})
            await this.user.pullArrayProperty(user._id,"products_created","products",pid)
            if(rol == "admin" && user.auth_ide.includes("@")){
                const text = `Hola ${user.firts_name} ${user.last_name} le informamos que nuestro equipo le ha borrado el producto con el id ${pid}.Comuniquese con nuestro soporte en caso de haber sido una confusión`
                sendMailActionOfAdmnin(user.auth_ide,text)
            }
            return deleteProduct
    }catch(err){
        logger.error(err)
        throw new Error(err)
    }
   }
}

export default ProductsRepository