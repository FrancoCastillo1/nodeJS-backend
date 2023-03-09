import User from "./models/user.model.js";


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
            let newObj = {...obj,rol:"User"}
            const user = await User.create(newObj)
            return user
        }catch(e){
           if(e.code == 1100) return;
            return false
        }
    }
}

export default UserClass