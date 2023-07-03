import UserClass from "../DAO/mongo/user.dao.js";
import __dirname from "../utlis/dirname.js";

export async function logoutUser(auth_ide){
    const instanceUser = new UserClass()
    try{
        const searchUser = await instanceUser.getUser({auth_ide,})
            if((searchUser.last_connection === "none")){
                const data = new Date()
                const dateLastConnection = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
               return await instanceUser.patchUser(searchUser._id,{last_connection:dateLastConnection})   
            }
        return ["El usuario ya hizo logout",false,403]
    }catch(err){
        throw new Error(err)
    }
}

export async function conectionUser(auth_ide){
    const instanceUser = new UserClass()
    try{
        const searchUser = await instanceUser.getUser({auth_ide,})
         searchUser.last_connection !== "none"?await instanceUser.patchUser(searchUser._id,{last_connection:"none"}):" "
    }catch(err){
        throw new Error(err)
    }
}

export async function createDocument(auth_ide,site,name){
    const instanceUser = new UserClass()
    try{
        const searchUser = await instanceUser.getUser({auth_ide,})
        const reference = `${__dirname}/images/${site}`
        const objDoc = {
            name,
            reference,
        }
        return await instanceUser.pushArrayProperty(searchUser._id,"documents",objDoc)
    }catch(err){
        throw new Error(err)
    }    
}


export async function patchRolUsers(_id,cambioRol,auth_ide){
    const instanceUsers =  new UserClass()
    try{
        const isAdmin = await instanceUsers.getUser({auth_ide,})

        if(isAdmin.rol != "admin") return ["No puedes cambiar rol si no sos admin",false,403]

        const getUserId = await instanceUsers.getUserById(_id)
        if(!getUserId) return ["No existe el id",false,404]

        if(getUserId.rol == cambioRol) return ["No puedes cambiar el rol porque ya existe",false,409]

        const validateArray = ["Identificación", "Comprobante de domicilio", "Comprobante de estado de cuenta"]
        let corroborate = true
        for(let i = 0;i<validateArray.length;i++){
            const encontrarDoc = getUserId.documents.some(item => item.name == validateArray[i])
            if(!encontrarDoc){
                corroborate = false
                break
            }
        }

        const message = `Este usuario ${getUserId.firts_name + getUserId.last_connection} al que desea cambiar debe tener los siguientes documentos adjuntos:Identificación, Comprobante de domicilio y Comprobante de estado de cuenta`
        if(!corroborate) return [message,false,403]

        return await instanceUsers.patchUser(id,{rol:cambioRol})
    }catch(err){
        throw new Error(err)
    }
}
export async function corroboratePassword(auth_ideUser,newPassword,repeteadPassword){
    if(!newPassword || !repeteadPassword || !auth_ideUser)return ["debes completar los 3 campos para continuar",false,400]
    if(newPassword != repeteadPassword)return ["las contaseñas no coinciden",false,400]

    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/
    if(!regex.test(repeteadPassword)) return ["La contraseña debe tener al menos 10 carácteres, un digito y un simbolo especial",false,400]

    try{
        const user = await instanceUser.getUser({auth_ide:auth_ideUser})

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