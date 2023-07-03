import UserClass from "../DAO/mongo/user.dao.js"
import instanceCart from "../DAO/mongo/cart.dao.js"

const userInstance = new UserClass()

export async function validateCid(req,res,next){
    const {cid} = req.params
    if(cid.length !== 24) return res.status(403).json({message:`El ${cid} no es un id válido.Recuerda que tiene que ser de 24 carácteres alfanuméricos`})
    next()
}

export async function seeIdCart(req,res,next){
    const {auth_ide} = req.user
    const {cid} = req.params
    try{
        const user = await userInstance.getUser({auth_ide,})
        const cart = await instanceCart.getCartById(cid)
        if(!cart) return res.status(404).json({message:"El carriro no existe"})
        const cartUser = user?.cart?._id.toString()
        const cartId = cart._id.toString()

        if(cartUser !== cartId && user.rol != "admin") return res.status(403).json({message:"No podés acceder a carritos de otras personas"})

        next()
    }catch(err){
        throw new Error(err)
    }
}