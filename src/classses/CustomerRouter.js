import { Router } from "express";

class CustomerRouter{
    constructor(){
        this.router = Router()
        this.init()
    }

    init(){}

    getRouter(){return this.router}

    get(path,...callback){
        this.router.get(path,this.generateRouter,this.appyCallbacks(callback))
    }

    post(path,...callback){
        this.router.post(path,this.generateRouter,this.appyCallbacks(callback))
    }

    put(path,...callback){
        this.router.put(path,this.generateRouter,this.appyCallbacks(callback))
    }

    patch(path,...callback){
        this.router.patch(path,this.generateRouter,this.appyCallbacks(callback))
    }

    delete(path,...callback){
        this.router.put(path,this.generateRouter,this.appyCallbacks(callback))
    }
    
    appyCallbacks(callbacks){
        return callbacks.map(callback => async(...params) =>{ 
            // explicacion, son muchos middlewares que recibimos(callbacks), indivudualmente los separamos en la primera iteración(callback) y despues, creamos otra función para separar todos los paramétros
            try{
                await callback.apply(this.params) // explicar este método luego
            }catch(err){
                params[1].send(500).json({error:"Internal Server"})
            }
        })
    }

    generateRouter(){
        res.sendSucces = ({payload,code}) => res.status(code).json({status:"success",payload , statusCode :code})

        res.sendServerError = error => res.status(500).json({status:"error", error:"Internal server error"})

        res.sendUserError = ({error,code}) => res.status(code).json({status:"error",message:error,statusCode:code})
        
        next()
    }

 /*    authjwt(){} ponerlo siempre encima de lor routers(en get/post) */
}

export default CustomerRouter