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
        enum: ['user', 'admin', 'premium'],
        type:String,
        default:"user"
    },
    last_connection:String,
    password:String,
    documents:[
        {
            name:String,
            reference:{
                type:String,
                unique:true
            }
        }
    ]
})
userSchema.pre("findOne",function () {this.populate("cart")})
const User = mongoose.model(userCollection,userSchema)

export default User