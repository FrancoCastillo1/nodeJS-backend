import winston from "winston";
import customLevlesOptions from "../utlis/loggerCustomOptions.utils.js";

const loggerP = winston.createLogger({
    levels:customLevlesOptions.levels,
    transports:[
        new winston.transports.Console({levels:["info", "warning",]}),
        new winston.transports.File({filename:`${process.cwd()}/logs/error.log`, level:"error"}),
        new winston.transports.File({filename:`${process.cwd()}/logs/fatal.log`,level:"fatal"}),
    ]
})

export default loggerP