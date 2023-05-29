import express from "express";
import __dirname from "./utlis/dirname.js";
import routes from "./router/index.js";
import handlebars  from "express-handlebars";
import config from "./config/index.js";
import passport from "passport";
import inicailizePassport from "./config/passport-config.js";
import cookieParser from "cookie-parser";
import session from "express-session"
import errorHandler from "./middlewares/handler.error.js";
import addLogger from "./middlewares/logger.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUIExpress from "swagger-ui-express";

const {sessionStore} = config
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const swaggerOption = {
  definition:{
    openapi:"3.0.1",
    info:{
      title:"Documentación de Ecomerse",
      description:"Información sobre los métodos necesarios para trabajar con la API"
    },
  },
  apis:[`${__dirname}/docs/**/*.yaml`]
}
const speces = swaggerJSDoc(swaggerOption)
app.use("/apidoc",swaggerUIExpress.serve,swaggerUIExpress.setup(speces))

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
/* mongoose.set("strictQuery",false) 
mongoose.connect(`mongodb+srv://${admin}:${password}@devanmongo.6a1rq04.mongodb.net/?retryWrites=true&w=majority`)
.then(res => console.log("db is connected"))
.catch(err => console.log(err) ) */
/* conectMongo() */
routes(app)

export default app