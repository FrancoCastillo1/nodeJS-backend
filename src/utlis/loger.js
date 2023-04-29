import winston from "winston"

const logger = winston.createLogger({
    transports:[
        new winston.transport.Console({level:"http"}), // para usar estos "logs" req.logger.[metodo a usar], en este caso "http"
        new winston.transport.File({filename:"./error.log",  level:"warn"})
    ],
})

const addLogger = (req,res,next) =>{
    req.logger = logger
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}  `)
    next()
}

export default addLogger