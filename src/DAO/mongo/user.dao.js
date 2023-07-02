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
            if(err.code == 11000) throw new Error(err.message)
            throw new Error(e)
        }
    }
    async setNewProperty(id,property,value){
        try{
            const updatedUser = await User.updateOne(
                { _id: id },
                { $set: { [property]: value } }
              );
              return updatedUser
        }catch(err){
            throw new Error(err)
        }
    }
    async unsetPropery(id,property){
        try{
            const deleteProperty = await User.updateOne( 
                {_id:id},
                { $unset: { [property]: 1 }},
            )
            return deleteProperty
        }catch(err){
            throw new Error(err)
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
    async pullArrayProperty(id,array,property,pid) {
        try {
            const resultado = await User.updateOne(
                { _id: id },
                { $pull: { [array]: { [property]: pid } } },
                { new: true }
            );
            return resultado
        } catch (error) {
         throw new Error(error)
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