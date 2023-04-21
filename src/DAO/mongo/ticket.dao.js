import Ticket from "./models/tiket.model.js";
class ClassTicket{
    async postTicket(datoTicket){
        try{
            const ticketPost = await Ticket.create(datoTicket)
            return ticketPost
        }catch(err){
            throw new Error(err)
        }
    }
}

export default ClassTicket