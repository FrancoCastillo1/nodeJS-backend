import mongoose from "mongoose"

const userCollection = "user"

const userSchema = new mongoose.Schema({
    googleId:String,
    firts_name :String,
    last_name:String,
    email:{
        unique:true,
        index:true,
        type:String,
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cart",
    },
    rol:{
        type:String,
        default:"user"
    },
    password:String,
})
userSchema.pre("findOne",function () {this.populate("cart")})
const User = mongoose.model(userCollection,userSchema)

export default User