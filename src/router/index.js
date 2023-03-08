import products from "../products/controller.products.js"
import cart from "../carts/controller.carts.js"
import real from "../realtimeproducts/real.js"
import message from "../message/controller.message.js"
import viewsTemplates from "../viewsTemplate/views.template.js"
import user from "../user/controller.user.js"

const routes = (app) =>{
   app.use("/",viewsTemplates)
   app.use("/api/products", products)
   app.use("/api/cart",cart)
   app.use("/realtimeproducts",real)
   app.use("/messages",message)
   app.use("/user",user)
}

export default routes