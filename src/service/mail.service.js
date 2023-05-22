import transport from "../utlis/transportEmail.js";
import config from "../config/index.js";
import UserClass from "../DAO/mongo/user.dao.js";

const instanceUser = new UserClass()

export async function sendMailForNewPassword(correoUsuario){
    const  {gmailUser} = config
    try{
        const obtenerUsuario = await instanceUser.getUser({email:correoUsuario})

         const result = await transport.sendMail({
            from:gmailUser,
            to:obtenerUsuario.email,
            subject:"Restablecer contraseña xd",
            headers: {
                'expiry-date': new Date(Date.now() * 60 * 60 * 1000).toUTCString()
            },
            html:`
            <div>
            <a href="http://localhost:8080/createnewpassword">Toca aqui para restablecerla</a>
            </div>
            `
        })
        return result
    }catch(err){
        throw new Error(err)
    }
}