const mongoose = require("mongoose")
const cartColection = "cart"
const cartSchema = mongoose.Schema({
    id:Number,
    products:Array
})
const Cart = mongoose.model(cartColection,cartSchema)
export default Cart