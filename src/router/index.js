import products from "../products/controller.products.js"
import cart from "../carts/controller.carts.js"
import real from "../realtimeproducts/real.js"
import message from "../message/controller.message.js"
import viewsTemplates from "../viewsTemplate/views.template.js"
import auth from "../auth/controller.auth.js"
import admin from "../admin/controller.admin.js"

const routes = (app) =>{
   app.use("/",viewsTemplates)
   app.use("/api/products", products)
   app.use("/api/cart",cart)
   app.use("/realtimeproducts",real)
   app.use("/messages",message)
   app.use("/auth",auth)
   app.use("/admin",admin)
}

export default routes