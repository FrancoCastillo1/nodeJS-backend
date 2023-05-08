import winston from "winston" // si falla solo debería ir solo winston
/* import {pkg as console} from "winston/lib/winston/transports/console.js"
import {pkg as files} from 'winston/lib/winston/transports/file.js' */
/* import pkg from "winston/lib/winston/transports/index.js" */
import customLevlesOptions from "../utlis/loggerCustomOptions.utils.js"

/* const {Console,File} = pkg */
/* const {File} = files */

const loggerD = winston.createLogger({
    levels:customLevlesOptions.levels,
    transports:[
        new winston.transport.Console({level:["debug", "http", "info", "warning", "error", "fatal"]}),
        new winston.transport.File({filename:`${process.cwd()}/logs/error.log`,level:["error", "fatal"]})
    ]
})

export default loggerD
