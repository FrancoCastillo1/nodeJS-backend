//aca va todo lo de passport
//passport siempre requiere :usuario y contraseña
/* import passport from "passport";
import local from "passport-local"
import { createHash } from "../utlis/createpassword.js";

const LocalStratery = local.Strategy

const inicailizePassport  = () =>{
    const LocalStratery = new LocalSratey(
        {passportReqToCallBack:true, userField:email},
        async(req,username,password,done) =>{
            const {firts_name,last_name,email,age}= req.body */
           /*  const user =  //aca le pregunta a mongo con un findOne, en mi caso productos/cart(cambiar luego) */
           /*  try{
                if(user){
                    console.log("user exists")
                    return done(null,false)
                }
                const newUser = {
                    firts_name,
                    last_name,
                    email,
                    password: createHash(password)
                } */
               /*  const userCreate =  &//aca creo en mongo */
            /*    return done(null, *//*aca iria "userCreate" )*/
          /*   }catch(e){
               return done("Error al obtener usuario",e)
            }
        }
    )

}
export default inicailizePassport */
