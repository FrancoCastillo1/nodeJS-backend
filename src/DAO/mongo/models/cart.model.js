import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"
const cartColection = "cart"
const cartSchema = new mongoose.Schema({
   /*  email:{
        unique:true,
        index:true,
        type:String,
    }, */
    products:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"products",
            },
            quankity:Number ?? 0
        }
    ]
})
cartSchema.pre("findOne",function () {this.populate("products.product")})
cartSchema.plugin(mongoosePaginate)
const Cart = mongoose.model(cartColection,cartSchema)
export default Cart