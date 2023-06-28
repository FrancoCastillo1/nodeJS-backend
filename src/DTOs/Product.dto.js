class ProductDTO{
    constructor(product){
        this.title = product.title,
        this.description = product.description,
        this.price = product.price,
        this.stock = product.stock,
        this.category = product.category,
        this.creator = {}
        this.creator.id = product.creator.id
        this.creator.owner = product.creator.owner
        this.thumbails = product.thumbails ?? "Sin i",
        this.status = product.status ?? true
    }
}

export default ProductDTO