import ProductDTO from "../DTOs/Product.dto.js"
class ProductsRepository{
    constructor(dao){
        this.dao = dao
    }
    async getProduct(limit,sortP ,page,query){
       try{
            return this.dao.getProduct(limit,sortP,page,query)
       }catch(err){
            throw new Error(err)
       }
    }

    async getProductsId(id){
        try{
            return this.dao.getProductsId(id)
        }catch(err){
            throw new Error(err)
        }
    }
    async addProducts(obj){
        let validate = true
        const productDto = new ProductDTO(obj)
        const array = Object.values(productDto)
        array.length = 5
        const validaciones = [5,13,1,1,4]
    
        if(array.at(-1) == false) return false;
    
        for(let i =0;i<array.length;i++){
            if(typeof array[i] == "number"){
                let string = array[i].toString()
                array[i] = string
            }
            if(array[i].length < validaciones[i]){
                validate = false
                break
            }
        }
        try{
            return this.dao.addProducts(obj)
        }catch(error){
            throw new Error(e)
        }
    }
    async updateProducts(pid,update,valueUpDate){
        try{
           return this.dao.updateProducts(pid,update,valueUpDate)
        }catch(e){
            throw new Error(e)
        }
    }
   
}

export default ProductsRepository