import winston from "winston";

const customLevlesOptions = {
    levels:{
        fatal:0,
        error:1,
        warning:2,
        info:3,
        debug:4
    },
    colors:{
        fatal:"red",
        error:"orange",
        waring:"yellow",
        info:"blue",
        debug:"grey"
    }
}

export default customLevlesOptions