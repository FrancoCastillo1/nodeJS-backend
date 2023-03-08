import Products from "./models/products.model.js";
import fs from "fs/promises"
class ProductManager{
    async getProduct(limit,sortP ,page,query){
        try{
           if (limit || sortP || page || query) {
                const get = await Products.paginate(query ?? {}, {limit,page, sort: { date: sortP ?? -1 }, });
                const map = get.docs.map((item) => {
                return {
                ...item._doc,
                };
             });
             console.log("y",map)
              return map;
            }
            const products = await Products.find()
            const map = products.map(item=>{
                return{
                    ...item._doc
                }
            })
            return map
        }catch(error){
            return false
        }
        

    }
    async getProductsId(id){
        try{
            const getId = await Products.findOne({_id:id})
            return getId
        }catch(error){
            return false
        }
    }
    async addProducts({title,description,price,thumbails,stock,category,status}){
        try{
            const post = await Products.create({title,description,price,thumbails,stock,category,status})
            return post
        }catch(error){
            return false
        }
    }
}

export default ProductManager