import winston from "winston";
import customLevlesOptions from "../utlis/loggerCustomOptions.utils.js";
const logger = winston.createLogger({
    levels:customLevlesOptions.levels,
    transports:[
        new winston.transport.Console({level:"info",format:winston.format.combine(winston.format.colorize({colors:customLevlesOptions.colors}),winston.format.simple())}),
        new winston.transport.File({filename:"./logs/warnings.log", level:"warning"})
    ]
})

export default logger