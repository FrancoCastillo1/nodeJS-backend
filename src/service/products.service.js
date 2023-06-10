import ProductManager from "../DAO/mongo/product.dao.js";

export async function deleteDataNoClient(){
    const instanceProduct = new ProductManager()
    try{
        const getTotalProduct = await instanceProduct.getProducts()
        const deleted = getTotalProduct.map((item) =>{
            delete item.cretor
            delete item._v
            return item
        })
        return deleted
    }catch(err){
        throw new Error(err)
    }
}