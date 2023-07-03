import Cart from "./models/cart.model.js"
import logger from "../../logger/factory.js"

class CartManager{
   constructor(){}
   async getCartsCount(){
    try{
        const countCarts = Cart.find({}).countDocuments();
        return countCarts
    }catch(err){
        logger.error(err)
        throw new Error(err)
    }
   }
   async getCart(object){
        try{
            const cart = await Cart.findOne(object)
            return cart
        }catch(error){
            logger.error(error)
           throw new Error(error)
        }
    }
    async getCartsByQuery(limit,sort,page,query){
        try{
            const cart = await Cart.paginate(query ?? {}, {limit,sort:{date:sort},page})
            return cart
        }catch(err){
            logger.error(err)
            throw new Error(err)
        }
    }
    async getCartById(id){
        try{
            const cartId = await Cart.findById(id)
            return cartId
        }catch(error){
            logger.error(error)
           throw new Error(error)
        }
    }
    async postCart(){
        const newCart = new Cart()
        try{
            const saveCart = newCart.save()
            return saveCart
        }catch(error){
            logger.error(error)
            throw new Error(error)
        } 
    }
    async replazeCart(id,replaze){
        try{
            const cart = await Cart.updateOne({_id:id},replaze)
            return cart
        }catch(err){
            logger.error(err)
            throw new Error(err)
        }
    }
    async deleteCart(cid){
        try{
            const upDate = await Cart.deleteOne({_id:cid})
            return upDate
        }catch(error){
            logger.error(error)
           throw new Error(error)
        }
    }
    async deleteProduct(cid,pid){
        try{
            const cart = await Cart.findOneAndUpdate(
                {_id:cid},
                {$pull:{products:{product:pid}}},
                {new:true}
            )
            return cart
        }catch(error){
            logger.error(error)
            throw new Error(error)
        }

    }
}

const instanceCart = new CartManager()

export default instanceCart