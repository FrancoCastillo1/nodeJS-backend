import Router from "express"

const logger = Router()

logger.get("/",(req,res) =>{
    res.send("hello world")
})

export default logger