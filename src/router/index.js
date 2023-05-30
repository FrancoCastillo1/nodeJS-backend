import products from "../controller/controller.products.js"
import cart from "../controller/controller.carts.js"
import realTime from "../controller/controller.real.js"
import message from "../controller/controller.message.js"
import viewsTemplates from "../viewsTemplate/views.template.js"
import auth from "../controller/controller.auth.js"
import admin from "../controller/controller.admin.js"
import session from "../controller/controller.session.js"
import ticket from "../controller/controller.ticket.js"
import moking from "../controller/controller.moking.js"
import logger from "../controller/controller.logger.js"
import users from "../controller/controller.users.js"

import passportCall from "../utlis/passportCallback.js"

const routes = (app) =>{
   app.use("/",viewsTemplates)
   app.use("/auth",auth)
   app.use(passportCall("current")),
   app.use("/api/products", products)
   app.use("/api/cart",cart)
   app.use("/api/users",users)
   app.use("/api/sessions",session)
   app.use("/realtimeproducts",realTime)
   app.use("/messages",message)
   app.use("/admin",admin)
   app.use("/ticket",ticket)
   app.use("/mockingproducts",moking)
   app.use("/loggerTest",logger)
   app.use("*" ,(req,res)=>{
      res.status(404).json({error:"Not found"})
   })
}

export default routes