import nodemailer from "nodemailer"
import config from "../config/index.js"

const {gmailAuth,gmailUser} = config

const transport = nodemailer.createTransport({
    tls: {
        rejectUnauthorized: false
    },
    service:"gmail",
    port:587,
    auth:{
        user:gmailUser,
        pass:gmailAuth
    }
})

export default transport