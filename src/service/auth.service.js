import UserClass from "../DAO/mongo/user.dao.js";
import { createHash,isValidPassword } from "../utlis/createpassword.js";

const instanceUser = new UserClass()

export async function corroboratePassword(auth_ide,newPassword,repeteadPassword){
    if(!newPassword || !repeteadPassword || !auth_ide)return ["debes completar los 3 campos para continuar",false,400]
    if(newPassword != repeteadPassword)return ["las contaseñas no coinciden",false,400]

    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/
    if(!regex.test(repeteadPassword)) return ["La contraseña debe tener al menos 10 carácteres, un digito y un simbolo especial",false,400]

    try{
        const user = await instanceUser.getUser({auth_ide:auth_ide,})

        const contraseñaAntigua = isValidPassword(user,repeteadPassword)
        if(contraseñaAntigua) return ["No podés cambiar tu contraseña a la actual que posees",false,409]

        const newPasswordUser = createHash(repeteadPassword)
        const idMongoUserString = user._id.toString()
        
        const userUpdate = await instanceUser.patchUser(idMongoUserString,{password:newPasswordUser})
        return userUpdate
    }catch(err){
        throw new Error(err)
    }
}