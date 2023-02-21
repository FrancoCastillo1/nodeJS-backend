import Products from "./models/products.model.js";
import fs from "fs/promises"
class ProductManager{
    async getProduct(limit = 10,sortP = -1 ,page = 1,query){
        try{
            const get = await Products.paginate(query ?? {},{limit,page,sort:{date:sortP}})
            const map = get.docs.map((item)=>{
                return{
                    ...item._doc,
                }
            })
            console.log("dddd",map)
            return map
        }catch(error){
            return [false,error]
        }
    }
    async getProductsId(id){
        try{
            const getId = await Products.findOne({_id:id})
            return getId
        }catch(error){
            return [false,error]
        }
    }
    async addProducts({title,description,price,thumbails,stock,category,status}){
        try{
            const post = await Products.create({title,description,price,thumbails,stock,category,status})
            return post
        }catch(error){
            return [false,error]
        }
    }
}
const productIntance = new ProductManager()

export default productIntance