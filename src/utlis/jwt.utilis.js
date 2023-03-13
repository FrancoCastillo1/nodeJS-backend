import jwt from "jsonwebtoken";

const SECRET_KEY = "coderSecret"

const generateToken = (user) =>{
    const token = jwt.sign({user,},SECRET_KEY,{expiresIn:"60s"}) // creamos un token con jwt(primer parámetro el usuario(lo que vamos a guardar), segundo la clave secreta, tercero cuando exprira el tokn)
    return token
}

const authToken = (req,res,next) => {
    const authHeader = req.headers.authorization
    if(!authHeader) return res.status(401).json({error:"not authenticated"})
    const token = authHeader.split(" ")[1] // métdodo split(si encuentra lo que le pasamos por parámetro, lo divide y se hace un array.)Como jwt es "bear fhkdhfd(aleaotoreo) lo convertimos en array y capturamos solo el token"
    jwt.verify(token,SECRET_KEY,(error,credentials) =>{
        if(error) return res.status(403).json({error:"not authorized"})

        req.user = credentials.user

        next()
    })
}

const authTokenCookie = (req,res,next) => {
    const token = req.cookie.authToken
    if(!token) return res.status(401).json({error:"not authenticated"})
    console.log(token)

    jwt.verify(token,SECRET_KEY,(error,credentials) =>{
        if(error) return res.status(403).json({error:"not authorized"})

        req.user = credentials.user

        next()
    })
}
export { generateToken,authToken}