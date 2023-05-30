import passport from "passport"
import jwt from "jsonwebtoken"

const passportCall = strategy =>{
    return async(req,res,next) =>{
        passport.authenticate(strategy,(err,user,info) =>{
            const decodeUser = jwt.decode(user) // obetenemos el objeto creado con newObect de jwt(borrar si no funciona)
            if(err) return next(err)
            if(!user){
                return res.status(401).json({error: info.messages ??  info.toString()})
            }
            req.user = user
            console.log(req.user,"xdd")
            next()
        })(req,res,next)
    }
}

export default passportCall