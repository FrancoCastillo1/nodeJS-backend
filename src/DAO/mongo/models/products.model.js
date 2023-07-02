import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const productsColection = "products"

const productsSchema = new mongoose.Schema({
    title:{
        type:String,
        index:true
    },
    description:String,
    price:{
        type:Number,
        index:true
    },
    public_creator:{
        type:String,
        index:true
    },
    stock:Number,
    category:String,
    thumbail:{
        type:String,
        default:"Sin imagen"
    },
    status:{
        type:Boolean,
        default:true
    },
    creator:{
       type:Object,
       id:{type:mongoose.Schema.Types.ObjectId},
        owner:{
            type:String,
            enum:["premium","admin"],
            default:"admin"
        }
    },
})
productsSchema.plugin(mongoosePaginate)
const Products = mongoose.model(productsColection,productsSchema)
export default Products