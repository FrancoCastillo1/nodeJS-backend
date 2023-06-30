export const seePermissions = async(req,res,next) =>{
    const {pid} = req.body
    const {email} = req.user
    try{
        const productId = await this.getProductsId(pid)
        const userMail = await this.user.getUser({email,})

        if(userMail.rol != "premium" && userMail.rol != "admin") return res.status(403).json({message:"No podés eliminar o actualizar productos si sos usuario"})
        if(!productId) return res.status(404).json({message:"No existe el producto"})
        if(productId.creator.id.toString() !== userMail._id.toString() && userMail.rol !== "admin") return res.status(403).json({message:"No podés eliminar o actualizar productos que no son tuyos"})
        
        next()
    }catch(err){
        res.status(500).json({message:err})
    }
}