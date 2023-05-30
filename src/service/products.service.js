import ProductManager from "../DAO/mongo/product.dao.js";

export async function deleteDataNoClient(){
    const instanceProduct = new ProductManager()
    try{
        const getTotalProduct = await instanceProduct.getProducts()
        const deleted = getTotalProduct.map((item,i) =>{
            delete item.cretor
            delete item._v
            return item
        })
        console.log(deleted)
        return deleted
    }catch(err){
        throw new Error(err)
    }
}