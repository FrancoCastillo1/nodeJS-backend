import mongoose from "mongoose";
import ProductManager from "../DAO/mongo/product.dao.js"
import UserClass from "../DAO/mongo/user.dao.js";
import logger from "../logger/factory.js";

export const seePermissions = async(req,res,next) =>{
    const {id} = req.params
    const {auth_ide} = req.user
    const instanceProduct = new ProductManager()
    const instanceUser = new UserClass()
    const objId = mongoose.Types.ObjectId(id)

    try{
        const productId = await instanceProduct.getProductsId(objId)
        const userMail = await instanceUser.getUser({auth_ide,})
        if(userMail.rol != "premium" && userMail.rol != "admin") return res.status(403).json({message:"No podés eliminar o actualizar productos si sos usuario"})

        if(!productId) return res.status(404).json({message:"No existe el producto"})
        if(productId.creator.id.toString() !== userMail._id.toString() && userMail.rol !== "admin") return res.status(403).json({message:"No podés eliminar o actualizar productos que no son tuyos"})
        next()
    }catch(err){
        logger.error(err)
        res.status(500).json({message:err})
    }
}