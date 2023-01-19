import products from "../products/controller.products.js"
import cart from "../carts/controller.carts.js"
console.log("llegaron hasta aca")
const routes = (app) =>{
   app.use("/api/products", products)
   app.use("/api/cart",cart)
}
export default routes