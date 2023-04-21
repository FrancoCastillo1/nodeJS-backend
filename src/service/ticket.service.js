import instanceCart from "../DAO/mongo/cart.dao.js"
import ProductManager from "../DAO/mongo/product.dao.js"
import { v4 as uuidv4 } from 'uuid';
import TikcetDTO from "../DTOs/Ticket.dto.js";
import ClassTicket from "../DAO/mongo/ticket.dao.js";

const uuid = uuidv4();

const instanceProducts = new ProductManager()
const instanceTicket = new ClassTicket()

const postTiket = async(cid) =>{
    const cartId = await instanceCart.getCartById(cid)
    const products = await instanceProducts.getProduct()
    if(!cartId) return false
   const productsCart = cartId.products

    products.map(async(item,i) =>{
         if(!productsCart[i]) return;
         if(item.title == productsCart[i].title){
               item.stock -= productsCart[i].stock
               if(item.stock < 0) return item._id;
               await instanceProducts.updateProducts(item._id,"stock",item.stock)
         }
    })
    if(!products) return;

    const code = uuid()
    const data = new Date()
    const datosDeLaCompra = `Ticket efectudo el día: ${data.getDate()} del mes ${data.getMonth()} del año ${data.getFullYear()}`
    const totalCompra = productsCart.reduce((acumm,item) => acumm + item.precio ,0)
    try{
        const dtoTicket = new TikcetDTO(code,data,totalCompra)
        await instanceTicket.postTicket(dtoTicket)
        return dtoTicket
    }catch(err){
        throw new Error(err)
    }

}

export default postTiket