import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"
const cartColection = "cart"
const cartSchema = mongoose.Schema({
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
cartSchema.plugin(mongoosePaginate)
const Cart = mongoose.model(cartColection,cartSchema)
cartSchema.pre("findOne",function () {
    this.populate("products.product")
})
export default Cart