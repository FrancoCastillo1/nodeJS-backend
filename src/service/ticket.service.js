import instanceCart from "../DAO/mongo/cart.dao.js"
import ProductManager from "../DAO/mongo/product.dao.js"
import { v4 as uuidv4 } from 'uuid';
import TikcetDTO from "../DTOs/Ticket.dto.js";
import ClassTicket from "../DAO/mongo/ticket.dao.js";
import UserClass from "../DAO/mongo/user.dao.js";
import logger from "../logger/factory.js";
import mongoose from "mongoose";

const instanceProducts = new ProductManager()
const instanceTicket = new ClassTicket()

const postTiket = async(cid,email) =>{
    const productosInexistentes = []
    const instanceUser = new UserClass()
    try{
        const user = await instanceUser.getUser({email,})
        if(!user) return ["El usuario no existe",404,false]
        if(user.rol == "admin") return ["Los admin no pueden terminar el proceso de compra de otros usuarios",false,403]
        const objectIdCart = mongoose.Types.ObjectId(cid)
        const cartId = await instanceCart.getCartById(objectIdCart)
        if(!cartId) return ["El carrito no existe",false,404]
        const productsCart = cartId.products
        if(productsCart.length == 0) return ["No tenés productos en tu carrito",false,403]
        for(let i =0;i<productsCart.length;i++){
            const product = await instanceProducts.getProductsId(productsCart[i].product._id)

            if(!product || !product.status){
                logger.warning("hubo un error en la validación del producto o en el status")
                productosInexistentes.push(productsCart[i].product._id)
                continue;
            } 
            const upDateStock = product.stock - productsCart[i].quankity
            await instanceProducts.updateProducts(product._id,"stock",upDateStock)
        }
        
        for(let productoInexistente in productosInexistentes){
          productsCart.splice(productoInexistente,1)
        }
        const code = uuidv4();
        const data = new Date()
        const datosDeLaCompra = `Ticket efectudo el día: ${data.getDate()} del mes ${data.getMonth() + 1} del año ${data.getFullYear()}`
        const totalCompra = productsCart.reduce((acumm,item) =>acumm + item.product.price,0)
        const dtoTicket = new TikcetDTO(code,datosDeLaCompra,totalCompra,email)

        await instanceTicket.postTicket(dtoTicket)
        await instanceCart.deleteCart(cartId)

        return {...dtoTicket, productosNoProcesado:productosInexistentes ?? 0}
    }catch(err){
        logger.error(err)
        throw new Error(err)
    }

}

export default postTiket