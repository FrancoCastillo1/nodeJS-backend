import Products from "./models/products.model.js";
import mongoose from "mongoose";
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
            throw new Error(error)
        }
    }
    async getProductsId(id){
        try{
            const getId = await Products.findById(id)
            return getId
        }catch(error){
            throw new Error(error)
        }
    }
    async getProductByKey(key,value){
        try{
            const getByKey = await Products.findOne({[key]:value})
            return getByKey
        }catch(err){
            throw new Error(err)
        }
    }

    async addProducts({title,description,price,thumbails,stock,category,status}){
        try{
            const post = await Products.create({title,description,price,thumbails,stock,category,status})
            return post
        }catch(error){
            throw new Error(error)
        }
    }
    async updateProducts(pid,update,valueUpDate){
        try{
            const idMonngo = mongoose.Types.ObjectId(pid);
            const put = await Products.updateOne(
                {_id:idMonngo},
                {$set:{[update]:valueUpDate}},
                )
            return put
        }catch(e){
            throw new Error(e)
        }
    }
    async deleteProductsId(pid){
        try{
            const deleteProduct = await Products.deleteOne({_id:pid})
            return deleteProduct
        }catch(err){
            throw new Error(err)
        }
    }
}

export default ProductManager