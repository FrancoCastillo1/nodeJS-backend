import UserClass from "../DAO/mongo/user.dao.js";

export async function patchRolUsers(_id,cambioRol,email){
    const instanceUsers =  new UserClass()
    try{
        const isAdmin = await instanceUsers.getUser({email,})

        if(isAdmin.rol != "admin") return ["No puedes cambiar rol si no sos admin",false]

        const getUserId = await instanceUsers.getUser({_id,})
        if(!getUserId) return ["No existe el id",false]

        if(getUserId.rol == cambioRol) return ["No puedes cambiar el rol porque ya existe",false]

        await instanceUsers.patchUser(id,{rol:cambioRol})
    }catch(err){
        throw new Error(err)
    }
}
export async function corroboratePassword(emailUser,newPassword,repeteadPassword){
    if(!newPassword || !repeteadPassword || !emailUser)return ["debes completar los 3 campos para continuar",false,400]
    if(newPassword != repeteadPassword)return ["las contaseñas no coinciden",false,400]

    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/
    if(!regex.test(repeteadPassword)) return ["La contraseña debe tener al menos 10 carácteres, un digito y un simbolo especial",false,400]

    try{
        const user = await instanceUser.getUser({email:emailUser})

        const contraseñaAntigua = isValidPassword(user,repeteadPassword)
        if(contraseñaAntigua) return ["No podés cambiar tu contraseña a la actual que posees",false,409]

        const newPasswordUser = createHash(repeteadPassword)
        const idMongoUserString = user._id.toString()
        
        const userUpdate = await instanceUser.patchUser(idMongoUserString,{password:newPasswordUser})
        console.log("que paso",userUpdate)
        return userUpdate
    }catch(err){
        throw new Error(err)
    }
}