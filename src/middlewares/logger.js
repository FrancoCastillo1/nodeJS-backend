import logger from "../logger/factory.js"

const addLogger = (req,res,next) => {
    req.logger = logger
    logger.info("hello")
    console.log("este es",logger.info)
    next()
}

export default addLogger