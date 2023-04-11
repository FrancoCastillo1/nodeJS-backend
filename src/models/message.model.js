import mongoose from "mongoose";
const messagesColection = "messages"

const messagesSchema = new mongoose.Schema({
    user:{
        type:String,
        unique:false
    },
    message:{
        type:String,
        unique:false
    }
})
const Messages = mongoose.model(messagesColection,messagesSchema)

export default Messages