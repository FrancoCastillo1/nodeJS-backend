import instanceCart from "../DAO/mongo/cart.dao.js"
import ProductManager from "../DAO/mongo/product.dao.js"
import { v4 as uuidv4 } from 'uuid';
import TikcetDTO from "../DTOs/Ticket.dto.js";
import ClassTicket from "../DAO/mongo/ticket.dao.js";
import CustomError from "../utlis/error/CustomError.js";
import logger from "../logger/factory.js";

const instanceProducts = new ProductManager()
const instanceTicket = new ClassTicket()

const postTiket = async(cid) =>{
    const productosInexistente = []

    const cartId = await instanceCart.getCartById(cid)
    const products = await instanceProducts.getProduct()
    if(!cartId) return false
    const productsCart = cartId.products
    for(let i =0;i<productsCart.length;i++){
        const encontrarProduct = products.find((item) => item._id.toString() == productsCart[i].product._id.toString())
        if(!encontrarProduct || !encontrarProduct.status){
            logger.warning("hubo un error en la validación del producto o en el status")
            productosInexistente.push(productsCart[i].product._id)
            continue;
        } 
        const upDateStock = encontrarProduct.stock - productsCart[i].quankity
        await instanceProducts.updateProducts(encontrarProduct._id,"stock",upDateStock)
    }
    const code = uuidv4();
    const data = new Date()
    const datosDeLaCompra = `Ticket efectudo el día: ${data.getDate()} del mes ${data.getMonth() + 1} del año ${data.getFullYear()}`
    const totalCompra = productsCart.reduce((acumm,item) =>acumm + item.product.price,0)
    const dtoTicket = new TikcetDTO(code,datosDeLaCompra,totalCompra)
    logger.info("este "+ dtoTicket)
    try{
        await instanceTicket.postTicket(dtoTicket)

        productosInexistente.length == 0 ?await instanceCart.deleteCart(cartId)
        :await instanceCart.replazeCart(cartId,productosInexistente)
        return {...dtoTicket, productosNoProcesado:productosInexistente ?? 0}
    }catch(err){
        logger.error(err)
        throw new Error(err)
    }

}

export default postTiket