import express from "express";
import __dirname from "./utilis.js";
import routes from "./router/index.js";
import handlebars  from "express-handlebars";
/* import mongoose from "mongoose"; */
import config from "./config/index.js";
import passport from "passport";
import inicailizePassport from "./config/passport-config.js";
import cookieParser from "cookie-parser";
/* import MongoStore from "connect-mongo"; */
import session from "express-session"
import conectMongo from "./db/mongo.init.js";
import errorHandler from "./middlewares/handler.error.js";
import addLogger from "./utlis/loger.js";

const {sessionStore} = config
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.engine("handlebars",handlebars.engine())
app.set("views",__dirname + "/views") 
app.set("view engine", "handlebars")
app.use(express.static( __dirname + "/public"))
app.use(cookieParser())
app.use(errorHandler)
app.use(addLogger)
app.use(session({
  /* store: MongoStore.create({
    mongoUrl: `mongodb+srv://${admin}:${password}@devanmongo.6a1rq04.mongodb.net/?retryWrites=true&w=majority`,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    ttl:60, 
  }), */
  secret: sessionStore,
  resave: false,
  saveUninitialized: false
}))
inicailizePassport()
app.use(passport.initialize())
app.use(passport.session())
/* app.use({
  bro
}) */
/* mongoose.set("strictQuery",false) 
mongoose.connect(`mongodb+srv://${admin}:${password}@devanmongo.6a1rq04.mongodb.net/?retryWrites=true&w=majority`)
.then(res => console.log("db is connected"))
.catch(err => console.log(err) ) */
/* conectMongo() */
routes(app)

export default app