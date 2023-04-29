import { faker } from "@faker-js/faker"

faker.locale = "es"

function generateRandomProducts(){
    const totalProducts = []
    for(let i =0;i<100;i++){
        const obj = {
            title:faker.commerce.productName(),
            description:faker.commerce.productDescription(),
            price:faker.commerce.price(),
            stock:faker.random.numeric(),
            category:faker.commerce.product(),
            thumbails:faker.image.imageUrl(500,500,faker.commerce.productName(),true)
        }
        totalProducts.push(obj)
    }
    return totalProducts
}

export default generateRandomProducts