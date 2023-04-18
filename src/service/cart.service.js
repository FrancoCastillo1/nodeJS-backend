import instanceCart from "../DAO/mongo/cart.dao.js"
import ProductManager from "../DAO/mongo/product.dao.js"

const instanceProducts = ProductManager()

const postTiket = (cid) =>{
    const cartId = instanceCart.getCartById(cid)
    if(!cartId) return false

     cartId.products.forEach(item =>{
        
        let restarStock = item.stock
     })

}