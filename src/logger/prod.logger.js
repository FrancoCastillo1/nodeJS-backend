import winston from "winston";
import customLevlesOptions from "../utlis/loggerCustomOptions.utils.js";

const loggerP = winston.createLogger({
    levels:customLevlesOptions.levels,
    transports:[
        new winston.transport.Console({level:["info", "warning", "error", "fatal"],format:winston.format.combine(winston.format.colorize({colors:customLevlesOptions.colors}),winston.format.simple())}),
        new winston.transport.File({filename:`${process.cwd()}/logs/error.log`, level:["error", "fatal"]})
    ]
})

export default loggerP