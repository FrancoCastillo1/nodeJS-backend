import ProductsRepository from "./Products.repository.js";
import productClass from "../DAO/factory.js";

const productsService = new ProductsRepository(new productClass())

export default productsService

