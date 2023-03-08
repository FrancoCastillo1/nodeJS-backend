import * as dotenv from 'dotenv'
dotenv.config()
const config = {
    port: process.env.PORT || 3000, //aca podes usar esto ya que no son datos sensibles
    admin:process.env.ADMIN_DB, // aca no podes usar el "or" si no funcina ya que este es un dato sensible
    password:process.env.PASSWORD_DB,
    sessionStore : process.env.SECRET_SESSION_STORE 
}
export default config