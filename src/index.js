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
/* import multer from "multer"; */

const {sessionStore} = config
const app = express();
/* const upload = multer() */

app.use(express.json())
app.use(express.urlencoded({extended: true}))
/* app.use(upload.fields([{ name: 'myFile', maxCount: 1 },{ name: 'site', maxCount: 1 }])); */

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
  secret: sessionStore,
  resave: false,
  saveUninitialized: false
}))
inicailizePassport()
app.use(passport.initialize())
app.use(passport.session())

routes(app)

export default app