import mongoose from "mongoose";
import config from "../config/index.js";

const {password,admin,sessionStore} = config

function conectMongo(){
    mongoose.set("strictQuery",false) 
    mongoose.connect(`mongodb+srv://${admin}:${password}@devanmongo.6a1rq04.mongodb.net/?retryWrites=true&w=majority`)
    .then(res => console.log("db is connected"))
    .catch(err => console.log(err) )
}
export default conectMongo