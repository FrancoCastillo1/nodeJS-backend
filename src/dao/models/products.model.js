import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const productsColection = "products"

const productsSchema = mongoose.Schema({
    title:{
        type:String,
        index:true
    },
    description:String,
    price:{
        type:Number,
        index:true
    },
    stock:Number,
    thumbail:{
        type:String,
        default:"Sin imagen"
    },
    status:{
        type:String,
        default:true
    },
    category:String,
})
productsSchema.plugin(mongoosePaginate)
const Products = mongoose.model(productsColection,productsSchema)
export default Products