function notSession(req,res,next){
    if(!req.session.user)return res.redirect("/")
    next()
}
export default notSession