import instanceCart from "../DAO/mongo/cart.dao.js"
import productsService from "../repository/product.index.js"

export async function putAndPostCart(cid,pid,quankity){
    try{
        const cartId = await instanceCart.getCartById(cid)
        const product = await productsService.getProduct()
        if(!product || !cartId) return false
        cartId.products.push({product:pid,quankity})
        return  await instanceCart.replazeCart(cartId._id,cartId)
    }catch(error){
        console.log(error)
        throw new Error(error)
    }
}

export async function patchProducts(cid,id,cantidad){
    try{
        const cart = await instanceCart.getCartById(cid)
        const filter = cart.products.findIndex((item) => item.product._id == id)
        if(filter == -1) return false
        const obj = cart.products[filter]
        obj.quankity = cantidad
        cart.products.splice(filter,1,obj)
        console.log(cart)
        const upDateProduct = await instanceCart.replazeCart(cart._id,cart)
        return upDateProduct
    }catch(error){
        throw new Error(error)
    }
    
}