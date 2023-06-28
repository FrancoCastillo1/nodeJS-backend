import config from "../config/index.js";

const {enviromnet} = config

console.log("este",enviromnet)

let logger;

switch(enviromnet){ 
    case "developmet":
        const loggerD = await import("./dev.logger.js")
        console.log("se ejecuto en ",enviromnet)
        logger = loggerD.default
        break
    case "production":
        const loggerP = await import("./prod.logger.js")
        console.log("se ejecuto en ",enviromnet)
        logger = loggerP.default
        break
    default:
        console.log("no existe ese tipo de variable")
        break   
}

export default logger