import UserClass from "../DAO/mongo/user.dao.js"
import instanceCart from "../DAO/mongo/cart.dao.js"

const userInstance = new UserClass()

export async function seeIdCart(req,res,next){
    const {email} = req.user
    const {cid} = req.params
    try{
        const user = await userInstance.getUser({email,})
        const cart = await instanceCart.getCartById(cid)
        if(user.cart !== cart._id && user.rol != "admin") return res.status(403).json({message:"No podés acceder a carritos de otras personas"})
        next()
    }catch(err){
        throw new Error(err)
    }
}