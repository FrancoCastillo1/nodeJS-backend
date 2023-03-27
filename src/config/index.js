import * as dotenv from 'dotenv'
dotenv.config()
const config = {
    port: process.env.PORT || 3000, 
    admin:process.env.ADMIN_DB, 
    password:process.env.PASSWORD_DB,
    sessionStore : process.env.SECRET_SESSION_STORE,
    clientIdGH : process.env.CLIENT_ID_GIT,
    clientSecretGH : process.env.CLIENT_SECRET_GIT,
    clientSecretGG : process.env.CLIENT_SECRET_GOOGLE,
    clientIdGG : process.env.CLIENT_ID_GOOGLE,
    secretJWT : process.env.SECRET_KEY_JWT
}
export default config