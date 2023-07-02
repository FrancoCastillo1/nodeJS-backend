import Products from "./models/products.model.js";
import mongoose from "mongoose";
class ProductManager{
    async getProductsCount(){
        try{
            const count = Products.find({}).countDocuments()
            return count
        }catch(err){
            throw new Error(err)
        }
    }

    async getProducts(){
        try{
            const products = await Products.find()
            return products
        }catch(err){
            throw new Error(err)
        }
    }

    async getProductByQuery(limit,sortP ,page,query){
        try{
            const get = await Products.paginate(query ?? {}, {limit,page, sort: { date: sortP }, });
            console.log("aca",get)
            return get;
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

    async addProducts({title,description,price,thumbails,stock,category,status,creator}){
        try{
            const post = await Products.create({title,description,price,thumbails,stock,category,status,creator})
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
                {new:true}
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