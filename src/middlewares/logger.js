import logger from "../logger/factory.js"

const addLogger = async(req,res,next) => {
    req.logger = await logger
    next()
}

export default addLogger