import User from "./models/user.model.js";
import { createHash } from "../../utlis/createpassword.js";

class UserClass{
    async getUserById(id){
        try{
            const userId = await User.findById(id)
            return userId
        }catch(err){
            throw new Error(err)
        }
    }
    async getUser(obj){
        try{
            const get = await User.findOne(obj)
            return get
        }catch(err){
            throw new Error(e)
        }
    }
    async postUser(obj){
        try{
            const {password} = obj
            obj.password = createHash(password)
            const user = await User.create(obj)
            return user
        }catch(err){
           if(e.code == 1100) return;
            throw new Error(e)
        }
    }
    async pushArrayProperty(id,keyArray,obj){
        try{
            const updatedUser = await User.updateOne(
                { _id: id },
                { $push: { [keyArray]: obj } },
              );
              return updatedUser
        }catch(err){
            throw new Error(err)
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