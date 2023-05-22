const authorizationJWT = role => {
   return(req,res,next) =>{
        if(!req.user) return res.status(401).json({error:"Unahorized"})

        if(req.user != role) 
           return res.status(403).json({error:"Forbidden!!"})   
        next()
   }
}
export default authorizationJWT