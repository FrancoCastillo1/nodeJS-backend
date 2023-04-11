import Messages from "../models/message.model.js";

class ClassMessage{
    async getMessages(){
        try{
            const get = await Messages.find()
            const map = get.map(({user,message,_id})=>{
                return {
                    user,
                    message,
                }
            })
            return map
        }catch(error){
            return [false,error]
        }
    }
    async postMessages(user,message){
        try{
            const post = await Messages.create({user,message})
            return true
        }catch(error){
            return [false,error]
        }
    }
   /*  async putMessage(position,upMessage){
        try{
           
        }
    } */
    async deleteMessage(id){
        try{
            const eliminar = await Messages.deleteOne({_id:id})
            return true

        }catch(error){
            return [false,error]
        }
    }
}
const mensajeManager = new ClassMessage()
export default mensajeManager