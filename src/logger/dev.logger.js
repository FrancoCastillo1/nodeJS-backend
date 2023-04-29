import winston from "winston"

const logger = winston.createLogger({
    transports:[
        new winston.transport.Console({level:"verbose"})
    ]
})

export default logger
