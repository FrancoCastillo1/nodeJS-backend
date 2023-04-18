import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const uuid = uuidv4();

const collectionTicket = "ticket"

const ticketSchema = new mongoose.Schema({
    code: uuid,
    purchase_datetime: String,
    ammount:Number,
    purchaser:String,
})