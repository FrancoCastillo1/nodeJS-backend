import mongoose from "mongoose"

const userCollection = "user"

const userSchema = new mongoose.Schema({
    googleId:String,
    firts_name :String,
    last_name:String,
    auth_ide:{
        unique:true,
        index:true,
        type:String,
    },
    products_created:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"products"
            }
        }
    ],
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cart",
    },
    rol:{
        enum: ['user', 'admin', 'premium'],
        type:String,
        default:"user"
    },
    last_connection:{
        type:String,
        default:"No auth"
    },
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
userSchema.pre("findOne",function () {
    this.populate("cart")
    this.populate("products_created.product")
})
const User = mongoose.model(userCollection,userSchema)

export default User