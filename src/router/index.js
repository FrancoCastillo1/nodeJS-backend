import products from "../controller/controller.products.js"
import cart from "../controller/controller.carts.js"
import real from "../realtimeproducts/real.js"
import message from "../controller/controller.message.js"
import viewsTemplates from "../viewsTemplate/views.template.js"
import auth from "../controller/controller.auth.js"
import admin from "../controller/controller.admin.js"
import session from "../controller/controller.session.js"
import ticket from "../controller/controller.ticket.js"

const routes = (app) =>{
   app.use("/",viewsTemplates)
   app.use("/api/products", products)
   app.use("/api/cart",cart)
   app.use("/api/sessions",session)
   app.use("/realtimeproducts",real)
   app.use("/messages",message)
   app.use("/auth",auth)
   app.use("/admin",admin)
   app.use("/ticket",ticket)
   app.use("*" ,(req,res)=>{
      res.status(404).json({error:"Not found"})
   })
}

export default routes