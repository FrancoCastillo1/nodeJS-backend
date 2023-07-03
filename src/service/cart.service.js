import instanceCart from "../DAO/mongo/cart.dao.js"
import productsService from "../repository/product.index.js"
import CustomError from "../utlis/error/CustomError.js"
import { EnumError,EnumNameError } from "../utlis/error/enum.error.js"
import {generateDocument,repetedDoc} from "../utlis/error/info.error.js"
import logger from "../logger/factory.js"
import UserClass from "../DAO/mongo/user.dao.js"
import mongoose from "mongoose"
import { sendMailActionOfAdmnin } from "./mail.service.js"

const instanceUser = new UserClass()

export async function generateNewCart(auth_ide){
    const instanceUser =new UserClass()
    try{
        const getUser = await instanceUser.getUser({auth_ide,})
        if(getUser.cart){
            const idCartString = getUser.cart._id.toString()
            return [`Ya tienes un carrito en tu cuenta ${getUser.firts_name}, cuyo id es ${idCartString}`,false,403]
        } 
        if(getUser.rol == "admin") return ["Los admin no pueden crearse carritos",false,403]
       const cart =  await instanceCart.postCart()
        await instanceUser.setNewProperty(getUser._id,"cart",cart._id)
        return cart._id.toString()
    }catch(err){
        throw new Error(err)
    }
}

export async function getCartById(cid){
    const objId = mongoose.Types.ObjectId(cid)
    try{
        return await instanceCart.getCartById(objId)
    }catch(err){
        throw new Error(err)
    }
}

export async function corroborateQuery(limit,sort,page,query){
    try{
        const totalCarts = await instanceCart.getCartsCount()
        const numberPage = page? Number(page):" "
        const numberLimit = limit?Number(limit):" "
        const numberSort = sort? Number(sort):" "

        if(!numberLimit || !numberPage || !numberSort) return ["Las querys limit,page,sort deben enviarse como numeros",false,403]   
        
        if(numberPage > totalCarts && numberLimit > totalCarts) return [`Las páginas o limites no pueden ser mayores a los carritos ${totalCarts} existentes`,false,403]
        if((typeof numberSort == "number") && (numberSort !== -1 && numberSort !== 1)) return ["La query sort solo acepta 1(ascendente) o -1(descendente)",false,403]

        numberLimit == " " && (limit = 10)
        numberSort == " " && (sort = - 1)
        numberPage == " " && (page = 1)

        if(query && typeof query !== "object") return ["La query debe ser un objecto",false,403]

        const querys = await instanceCart.getCartsByQuery(numberLimit,numberSort,numberPage,query)
        if(querys.totalDocs == 0) return [`La ${query} no coincide con ningún criterio de búsqueda`,false,403]
        return querys
    }catch(err){
        throw new Error(err)
    }
}

export async function postProduct(cid,pid,quankity,auth_ide){
    try{
        const user = await instanceUser.getUser({auth_ide,})
        if(user.rol == "premium"){
            const productsUser = user.products_created
            const filterProduct = productsUser.some(item => item.product._id.toString() == pid)
            if(filterProduct) return ["No puedes añadir productos tuyos",false,403]
        }
        const cartId = await instanceCart.getCartById(cid)
        const product = await productsService.getProductsId(pid)
        const idMongoString = product._id.toString() 

        if(!product || !cartId){
            logger.warning("Hubo un error en el id del producto o del carrito");
            CustomError.createError({
                name:EnumNameError.INVALID_CREDENTIALS_CART,
                cause:generateDocument(cartId),
                code:EnumError.INVALID_TYPES_ERROR,
            })
            return ["No existe el producto o el carrito",false,404]
        }

        if(!product.status) return ["El status del producto es falso",false,403]
        const verProductoRepetido = cartId.products.find(item => item.product._id.toString() == pid)

        if(product.stock == 0) return ["No es posible añadir productos sin stock",false,403]

        if(product.stock < quankity) return ["No se puede llevar más ejemplares de los que hay en stock",false,409]

        if(verProductoRepetido) return ["No podes añadir el mismo producto",false,403]

        const verCantidad = cartId.products.find(item => item.quankity == quankity && item.id == idMongoString)
        if(verCantidad){
            logger.warning("Se repitió la cantidad")
             CustomError.createError({
                name:EnumNameError.REPETED_VALUE,
                cause:repetedDoc(quankity),
                code:EnumError.REPETED_VALUE_DB_ERROR,
            })
            return ["No puedes añadir la misma cantidad",false,409]
        }
       cartId.products.push({product:pid,quankity})
        return  await instanceCart.replazeCart(cartId._id,cartId)
    }catch(error){
        logger.error(error)
        throw new Error(error)
    }
}

export async function patchProducts(cid,id,cantidad,rol){
    try{
        const objIdCart =  mongoose.Types.ObjectId(cid)
        const cart = await instanceCart.getCartById(objIdCart)
        const filter = cart.products.findIndex((item) => item.product._id == id)
        if(filter == -1 ||!cart){
            req.logger.warning("hubo un error en carrito o en producto")
            CustomError.createError({
                name:EnumNameError.INVALID_CREDENTIALS_CART,
                cause:generateDocument(cid,id),
                code:EnumError.INVALID_TYPES_ERROR,
            })
            return ["no existe el producto o el carrito",false,404]
        } 
        const obj = cart.products[filter]
        if(obj.quankity == cantidad) return ["No puedes añadir la misma cantidad",false,409]
        obj.quankity = cantidad
        cart.products.splice(filter,1,obj)
        const upDateProduct = await instanceCart.replazeCart(cart._id,cart)
        const user = await instanceUser.getUser({cart:cid})
        if(rol == "admin" && user.auth_ide.includes("@")){
            const text = `Hola ${user.firts_name} ${user.last_name} le informamos que nuestro equipo le ha borrado el producto con el id ${pid} de su carrito.Comuniquese con nuestro soporte en caso de haber sido una confusión`
            sendMailActionOfAdmnin(user.auth_ide,text)
        }
        return upDateProduct
    }catch(error){
        logger.error(error)
        throw new Error(error)
    }
    
}

export async function deleteProductCart(cid,pid,rol){
    const objectIdCart = mongoose.Types.ObjectId(cid)

    if(pid.length !== 24) return [`El ${pid} no es un id válido.Recuerda que tiene que ser de 24 carácteres alfanuméricos`,false,403]

    const objectIdProduct = mongoose.Types.ObjectId(pid)
    try{
        const cartById = await instanceCart.getCartById(cid)
        const productExist = cartById.products.find(item => item.product._id.toString() == pid)

        if(!productExist) return ["El producto no existe",false,404]

        const deleteProduct = await instanceCart.deleteProduct(objectIdCart,objectIdProduct)

        const user = await instanceUser.getUser({cart:cid})
        if(rol == "admin" && user.auth_ide.includes("@")){
            
            const text = `Hola ${user.firts_name} ${user.last_name} le informamos que nuestro equipo le ha borrado el producto con el id ${pid} de su carrito.Comuniquese con nuestro soporte en caso de haber sido una confusión`
            sendMailActionOfAdmnin(user.auth_ide,text)
        }
        return deleteProduct
    }catch(err){
        logger.error(err)
        throw new Error(err)
    }
}

export async function deleteCart(cid,rol){
    const objectIdCart = mongoose.Types.ObjectId(cid)
    try{
    const user = await instanceUser.getUser({cart:objectIdCart})
    if(rol == "admin" && user.auth_ide.includes("@")){
        const text = `Hola ${user.firts_name} ${user.last_name} le informamos que nuestro equipo le ha borrado el carrito.Comuniquese con nuestro soporte en caso de haber sido una confusión`
        sendMailActionOfAdmnin(user.auth_ide,text)
    }
        await instanceCart.deleteCart(objectIdCart)
        return await instanceUser.unsetPropery(user._id,"cart")
    }catch(err){
        logger.error(err)
        throw new Error(err)
    }
}