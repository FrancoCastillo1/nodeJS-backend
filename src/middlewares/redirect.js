const redirect = (param,redirect) =>{
    return (req,res,next) =>{
        const validator = (param == "login"?req.user:!req.user)
        if(validator) return res.redirect(redirect)
        next()
    }
}

export default redirect