import config from "../config/index.js";

const {enviromnet} = config

console.log("este",enviromnet)

let logger;

switch(enviromnet){ //en este caso traigo el ob  completo, sin que tenga la desicion que .env usar(osea no sirve) solo le estoy copiando al profe
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