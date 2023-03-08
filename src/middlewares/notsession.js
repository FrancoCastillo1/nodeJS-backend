function notSession(req,res,next){
    if(!req.session)return res.redirect("/")
    next()
}
export default notSession