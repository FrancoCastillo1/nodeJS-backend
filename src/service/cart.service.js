import instanceCart from "../DAO/mongo/cart.dao.js"
import productsService from "../repository/product.index.js"
import CustomError from "../utlis/error/CustomError.js"
import { EnumError,EnumNameError } from "../utlis/error/enum.error.js"
import {generateDocument,repetedDoc} from "../utlis/error/info.error.js"
import logger from "../logger/factory.js"
import UserClass from "../DAO/mongo/user.dao.js"
import mongoose from "mongoose"

const instanceUser = new UserClass()

export async function generateNewCart(email){
    const instanceUser =new UserClass()
    try{
        const getUser = await instanceUser.getUser({email,})
        if(getUser.cart) return [`Ya tienes un carrito en tu cuenta ${getUser.firts_name}`,false,403]
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

    !limit && (limit = 10)
    !sort && (sort = - 1)
    !page && (page = 1)
    if(query && typeof query !== "object") return ["La query debe ser un objecto",false,403]

    try{
        return await instanceCart.getCartsByQuery(limit,sort,page,query)
    }catch(err){
        throw new Error(err)
    }
}

export async function postProduct(cid,pid,quankity,email){
    try{
        const user = await instanceUser.getUser({email,})
        if(user.rol == "premium"){
            const creadorId = creator.id
            const products = await productsService.getProducts({[creadorId]:user._id.toString()})
            const filterProduct = products.find(item => item._id.toString() == pid)
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
        logger.info("cantidad actualizada","sss")
        return  await instanceCart.replazeCart(cartId._id,cartId)
    }catch(error){
        logger.error(error)
        throw new Error(error)
    }
}

export async function patchProducts(cid,id,cantidad){
    try{
        const cart = await instanceCart.getCartById(cid)
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
        
        return upDateProduct
    }catch(error){
        req.logger.error(error)
        throw new Error(error)
    }
    
}

export async function deleteProductCart(cid,pid){
    const objectIdCart = mongoose.Types.ObjectId(cid)
    const objectIdProduct = mongoose.Types.ObjectId(pid)

    if(pid.length !== 24) return [`El ${pid} no es un id válido.Recuerda que tiene que ser de 24 carácteres alfanuméricos`,false,403]

    try{
       return await instanceCart.deleteProduct(objectIdCart,objectIdProduct)
    }catch(err){
        throw new Error(err)
    }
}

export async function deleteCart(cid,email){
    const objectIdCart = mongoose.Types.ObjectId(cid)
    try{
        const user = await instanceUser.getUser({email,})

         await instanceCart.deleteCart(objectIdCart)
        return await instanceUser.unsetPropery(user._id,"cart")
    }catch(err){
        throw new Error(err)
    }
}