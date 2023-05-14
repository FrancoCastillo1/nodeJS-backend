import jwt from "jsonwebtoken";
import config from "../config/index.js";

const {secretJWT} = config

const generateToken = (user) =>{
    const token = jwt.sign({user,},secretJWT,{expiresIn:"60s"})
    return token
}

const authToken = (req,res,next) => {
    const authHeader = req.headers.authorization
    if(!authHeader) return res.status(401).json({error:"not authenticated"})
    const token = authHeader.split(" ")[1]
    jwt.verify(token,secretJWT,(error,credentials) =>{
        if(error) return res.status(403).json({error:"not authorized"})

        req.user = credentials.user

        next()
    })
}

const authTokenCookie = (req,res,next) => {
    const token = req.cookie.authToken
    if(!token) return res.status(401).json({error:"not authenticated"})
    jwt.verify(token,secretJWT,(error,credentials) =>{
        if(error) return res.status(403).json({error:"not authorized"})

        req.user = credentials.user

        next()
    })
}
export { generateToken,authToken,authTokenCookie}