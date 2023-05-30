const authorizationJWT = role => {
   return(req,res,next) =>{
        console.log("este es", req.user)
        if(!req.user) return res.status(401).json({error:"Unahorized"})

        if(req.user.rol != role) 
           return res.status(403).json({error:"Forbidden!!"})   
        next()
   }
}
export default authorizationJWT