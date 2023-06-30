import UserClass from "../DAO/mongo/user.dao.js";
import { deleteFs } from "../utlis/deletefromfs.js";
import __dirname from "../utlis/dirname.js";

export async function conectionUser(email){
    const instanceUser = new UserClass()
    try{
        const searchUser = await instanceUser.getUser({email,})
        if(searchUser.last_connection === "none" || searchUser.last_connection === "No auth"){
            const data = new Date()
            const dateLastConnection = `${data.getDay()}/${data.getMonth() + 1}/${data.getFullYear()}`
            await instanceUser.patchUser(searchUser._id,{last_connection:dateLastConnection})
            return ["Se elimino la sesión del usuario",204]
        }
        await instanceUser.patchUser(searchUser._id,{last_connection:"none"})
        return ["El usuario se logeo correctamente",200]
    }catch(err){
        throw new Error(err)
    }
}

export async function createDocument(email,site,name,path){
    const instanceUser = new UserClass()
    try{
        const searchUser = await instanceUser.getUser({email,})
        const reference = `${__dirname}/images/${site}`
        const objDoc = {
            name,
            reference,
        }
        return await instanceUser.pushArrayProperty(searchUser._id,"documents",objDoc)
    }catch(err){
        await deleteFs(path)
        throw new Error(err)
    }    
}


export async function patchRolUsers(_id,cambioRol,email){
    const instanceUsers =  new UserClass()
    try{
        const isAdmin = await instanceUsers.getUser({email,})

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