import Router from "express"

const logger = Router()

logger.get("/",(req,res) =>{
    req.logger.debug("aaa")
    req.logger.http("sss")
    req.logger.info("probando")
    req.logger.warning("falló");
    req.logger.error(6556, true)
    req.logger.fatal({user:"mate",lastName:"naran"})
    res.json({message:"Probando los logs"})
})

export default logger