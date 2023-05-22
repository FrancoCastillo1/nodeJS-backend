import User from "./models/user.model.js";
import { createHash } from "../../utlis/createpassword.js";

class UserClass{
    async getUser(obj){
        try{
            const get = await User.findOne(obj)
            return get
        }catch(e){
            throw new Error(e)
        }
    }
    async postUser(obj){
        try{
            const {password} = obj
            obj.password = createHash(password)
            const user = await User.create(obj)
            return user
        }catch(e){
           if(e.code == 1100) return;
            return false
        }
    }

    async patchUser(id,objUpdate){
        try{
            const cambiarValor = await User.updateOne(
               { _id:id},
               {$set:objUpdate})
            return cambiarValor
        }catch(err){
            throw new Error(err)
        }
    }
}

export default UserClass