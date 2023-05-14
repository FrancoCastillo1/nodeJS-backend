import winston, { format } from "winston" // si falla solo debería ir solo winston
/* import {pkg as console} from "winston/lib/winston/transports/console.js"
import {pkg as files} from 'winston/lib/winston/transports/file.js' */
/* import pkg from "winston/lib/winston/transports/index.js" */
import customLevlesOptions from "../utlis/loggerCustomOptions.utils.js"

/* const {Console,File} = pkg */
/* const {File} = files */

const loggerD = winston.createLogger({
    levels:customLevlesOptions.levels,
    transports:[
        new winston.transports.Console({levels:["debug", "http", "info", "warning"],
       /*  format:winston.format.combine(
        winston.format.colorize({colors:customLevlesOptions.colors})
        winston.format.simple()
        ), esto no funciona */
    }),
        new winston.transports.File({
        filename:`${process.cwd()}/logs/error.log`,
        level:"error",
    }),
        new winston.transports.File({
        filename:`${process.cwd()}/logs/fatal.log`, 
        level:"fatal",
    })
    ]
})
export default loggerD
