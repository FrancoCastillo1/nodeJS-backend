import User from "./models/user.model.js";
import { createHash } from "../utlis/createpassword.js";

class UserClass{
    async getUser(obj){
        try{
            const get = await User.findOne(obj)
            let newUser = {
                firtsName : get.firts_name,
                lastName : get.last_name,
                email: get.email
            }
            return newUser
        }catch(e){
            return false
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
}

export default UserClass