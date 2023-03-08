function sessionExist(req,res,next){
    console.log("wow",req.session ,"y",req.session.user)
    if(req.session.user)return res.redirect("/api/products")
    next()
}

export default sessionExist