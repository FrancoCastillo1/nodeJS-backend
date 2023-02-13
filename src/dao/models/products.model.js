import mongoose from "mongoose";
const productsColection = "products"

const productsSchema = mongoose.model({
    id:Number,
    title:String,
    description:String,
    price:Number,
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
const Products = mongoose.model(productsColection,productsSchema)
export default Products