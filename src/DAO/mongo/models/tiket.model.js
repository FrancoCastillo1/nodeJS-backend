import mongoose from "mongoose";

const collectionTicket = "ticket"

const ticketSchema = new mongoose.Schema({
    code: String,
    purchase_datetime: String,
    ammount:Number,
    purchaser:String,
})

const Ticket = mongoose.model(collectionTicket,ticketSchema)

export default Ticket