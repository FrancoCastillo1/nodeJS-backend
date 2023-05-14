import logger from "../logger/factory.js"

const addLogger = async(req,res,next) => {
    req.logger = await logger
   /*  logger.info("hello") */
    next()
}

export default addLogger