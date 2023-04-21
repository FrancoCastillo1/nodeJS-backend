import config from "../config/index.js";
import conectMongo from "../db/mongo.init.js"

const {persistence} = config

let productClass;

switch(persistence){
    case "MONGO":
        conectMongo()
        const {default:ProductManager} = await import("./mongo/product.dao.js")
        productClass = ProductManager
        break
    case "FILES":
        const {default:productFile} = await import("./file/ProductManager.js")
        productClass = productFile
        break    
}

export default productClass
