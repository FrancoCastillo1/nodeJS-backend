import instanceCart from "../DAO/mongo/cart.dao.js"
import productsService from "../repository/product.index.js"
import CustomError from "../utlis/error/CustomError.js"
import { EnumError,EnumNameError } from "../utlis/error/enum.error.js"
import {generateDocument,repetedDoc} from "../utlis/error/info.error.js"
import logger from "../logger/factory.js"


export async function putAndPostCart(cid,pid,quankity){
    try{
        const cartId = await instanceCart.getCartById(cid)
        const product = await productsService.getProductsId(pid)
        const idMongoString = product._id.toString() 
        const verCantidad = cartId.products(item => item.quankity == quankity && item.id == idMongoString)
        if(verCantidad){
            logger.warning("Se repitió la cantidad")
            CustomError.createError({
                name:EnumNameError.REPETED_VALUE,
                cause:repetedDoc(quankity),
                code:EnumError.REPETED_VALUE_DB_ERROR,
            })
        }
        if(!product || !cartId){
            logger.warning("Hubo un error en el id del producto o del carrito");
            CustomError.createError({
                name:EnumNameError.INVALID_CREDENTIALS_CART,
                cause:generateDocument(cartId),
                code:EnumError.INVALID_TYPES_ERROR,
            })
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
        } 
        const obj = cart.products[filter]
        obj.quankity = cantidad
        cart.products.splice(filter,1,obj)
        req.logger.info(cart)
        const upDateProduct = await instanceCart.replazeCart(cart._id,cart)
        return upDateProduct
    }catch(error){
        req.logger.error(error)
        throw new Error(error)
    }
    
}