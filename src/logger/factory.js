import config from "../config/index.js";

let logger;

switch(config){ //en este caso traigo el ob  completo, sin que tenga la desicion que .env usar(osea no sirve) solo le estoy copiando al profe
    case "development":
        let loggerD = import("../../")
        break
    default:
        break
        
}