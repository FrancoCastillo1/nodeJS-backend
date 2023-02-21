import express from "express";
import __dirname from "./utilis.js";
import routes from "./router/index.js";
import handlebars  from "express-handlebars";
import mongoose from "mongoose";
import config from "./config/index.js";

const app = express();
app.engine("handlebars",handlebars.engine())
app.set("views",__dirname + "/views") 
app.set("view engine", "handlebars")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/public",express.static( __dirname + "/public"))

const {password,admin} = config

mongoose.set("strictQuery",false) 
mongoose.connect(`mongodb+srv://${admin}:${password}@devanmongo.6a1rq04.mongodb.net/?retryWrites=true&w=majority`,(error)=>{ // si no funciona falta un 
    if(error){
        return console.log(error)
    }

})

routes(app)

export default app