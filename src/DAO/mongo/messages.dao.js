import Messages from "./models/message.model.js";

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
            throw new Error(error)
        }
    }
    async postMessages(user,message){
        try{
            const post = await Messages.create({user,message})
            return post
        }catch(error){
            throw new Error(error)
        }
    }
    async deleteMessage(id){
        try{
            const eliminar = await Messages.deleteOne({_id:id})
            return eliminar

        }catch(error){
            throw new Error(error)
        }
    }
}
const mensajeManager = new ClassMessage()
export default mensajeManager