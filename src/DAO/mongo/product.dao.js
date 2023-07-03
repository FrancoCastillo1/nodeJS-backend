import logger from "../../logger/factory.js";
import Products from "./models/products.model.js";
import mongoose from "mongoose";
class ProductManager{
    async getProductsCount(){
        try{
            const count = Products.find({}).countDocuments()
            return count
        }catch(error){
            logger.error(error)
            throw new Error(err)
        }
    }

    async getProducts(){
        try{
            const products = await Products.find()
            return products
        }catch(error){
            logger.error(error)
            throw new Error(err)
        }
    }

    async getProductByQuery(limit,sortP ,page,query){
        try{
            const get = await Products.paginate(query ?? {}, {limit,page, sort: { date: sortP }, });
            return get;
        }catch(error){
            logger.error(error)
            throw new Error(error)
        }
    }

    async getProductsId(id){
        try{
            const getId = await Products.findById(id)
            return getId
        }catch(error){
            logger.error(error)
            throw new Error(error)
        }
    }

    async getProductByKey(key,value){
        try{
            const getByKey = await Products.findOne({[key]:value})
            return getByKey
        }catch(error){
            logger.error(error)
            throw new Error(err)
        }
    }

    async addProducts({title,description,price,thumbails,stock,category,status,creator}){
        try{
            const post = await Products.create({title,description,price,thumbails,stock,category,status,creator})
            return post
        }catch(error){
            logger.error(error)
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
        }catch(error){
            logger.error(error)
            throw new Error(e)
        }
    }

    async deleteProductsId(pid){
        try{
            const deleteProduct = await Products.deleteOne({_id:pid})
            return deleteProduct
        }catch(error){
            logger.error(error)
            throw new Error(err)
        }
    }
}

export default ProductManager