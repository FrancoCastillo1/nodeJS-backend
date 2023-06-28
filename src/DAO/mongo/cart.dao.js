import Cart from "./models/cart.model.js"
import Products from "./models/products.model.js"
import logger from "../../logger/factory.js"

class CartManager{
   constructor(){}
   
   async getCart(limit = 10,sort = -1,page = 1,query){
        try{
            const cart = await Cart.paginate(query ?? {} ,{limit,sort:{date:sort},page})
            return cart

        }catch(error){
           throw new Error(error)
        }
    }
    async getCartById(cid){
        try{
            const cartId = await Cart.findOne({_id:cid})
            return cartId
        }catch(error){
            logger.error(error)
           throw new Error(error)
        }
    }
    async postCart(){
        const cartPost =new Cart()
        try{
            await cartPost.save()
            return cartPost
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