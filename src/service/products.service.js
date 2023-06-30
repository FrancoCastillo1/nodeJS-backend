import productsService from "../repository/product.index.js"

export async function deleteDataNoClient(){
    try{
        const getTotalProduct = await productsService.getProducts()
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