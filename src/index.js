import express from "express";
import __dirname from "./utilis.js";
import routes from "./router/index.js";
import handlebars  from "express-handlebars";
import mongoose from "mongoose";
import config from "./config/index.js";
import passport from "passport";
import inicailizePassport from "./config/passport-config.js";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import session from "express-session"

const {password,admin/* ,sessionStore */} = config

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.engine("handlebars",handlebars.engine())
app.set("views",__dirname + "/views") 
app.set("view engine", "handlebars")
app.use(express.static( __dirname + "/public"))
app.use(cookieParser())

app.use(session({
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://${admin}:${password}@devanmongo.6a1rq04.mongodb.net/?retryWrites=true&w=majority`,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    ttl:60, //se mide en segundos, si no ponemos nada serán 15 días(no recomendable), es el tiempo el cual moongose almacenará nuestra session o cuanto tiempo estará abierta
  }),
  secret: 'loQueQuieras',
  resave: false,
  saveUninitialized: false
}))
inicailizePassport()
app.use(passport.initialize())
app.use(passport.session())

mongoose.set("strictQuery",false) 
mongoose.connect(`mongodb+srv://${admin}:${password}@devanmongo.6a1rq04.mongodb.net/?retryWrites=true&w=majority`)
.then(res => console.log("db is connected"))
.catch(err => console.log(err) )

routes(app)

export default app