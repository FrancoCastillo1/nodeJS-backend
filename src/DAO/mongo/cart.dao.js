import Cart from "./models/cart.model.js"
import Products from "./models/products.model.js"

class CartManager{
    constructor(file){
    this.file = `${process.cwd()}/src/${file}`
   } 
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
            console.log(error)
            return false
        }
    }
    async postCart(){
        const cartPost =new Cart()
        try{
            await cartPost.save()
            return cartPost
        }catch(error){
            console.log(error)
            return false
        } 
    }
   /*  async putAndPostCart(cid,pid,quankity){
        try{
            const cart = await Cart.findOne({_id:cid})
            const product = await Products.findOne({_id:pid})
            if(!product || !cart) return false
            cart.products.push({product:pid,quankity})
            const result = await Cart.updateOne({_id:cid},cart)
            return result
        }catch(error){
            console.log(error)
            return false
        }
    } */
    async replazeCart(id,replaze){
        try{
            const cart = await Cart.updateOne({_id:id},replaze)
            return cart
        }catch(err){
            throw new Error(err)
        }
    }

    /* async patchProducts(cid,id,cantidad){
        try{
            const put = await Cart.findOne(
                {_id:cid},
            )
            const filter = put.products.findIndex((item) => item.product == id)
            if(filter == -1) return false
            const obj = put.products[filter]
            obj.quankity = cantidad
            put.products.splice(filter,1,obj)
            const upDate = await Cart.updateOne({_id:cid},put)
            return upDate
        }catch(error){
            console.log(error)
            return false
        }
        
    } */
    async deleteCart(cid){
        try{
            const upDate = await Cart.deleteOne({_id:cid})
            console.log(upDate)
            return upDate
        }catch(error){
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
            console.log(error)
            return false
        }

    }
}

const instanceCart = new CartManager()

export default instanceCart