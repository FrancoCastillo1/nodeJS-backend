import mongoose from "mongoose"

const userCollection = "user"

const userSchema = new mongoose.Schema({
    firts_name :String,
    last_name:String,
    email:{
        unique:true,
        index:true,
        type:String,
    },
    rol:String,
    password:String,
})
const User = mongoose.model(userCollection,userSchema)

export default User