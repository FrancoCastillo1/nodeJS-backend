import config from "../config/index.js";

const {enviromnet} = config

console.log("este",enviromnet)

let logger;

if(enviromnet == "developmet") console.log("xddd")

switch(enviromnet){ //en este caso traigo el ob  completo, sin que tenga la desicion que .env usar(osea no sirve) solo le estoy copiando al profe
    case "developmet":
        let loggerD = import("./dev.logger.js")
        logger = loggerD
        break
    case "production":
        let loggerP = import("./prod.logger.js")
        logger = loggerP
        break
    default:
        console.log("no existe ese tipo de variable")
        break   
}

export default logger