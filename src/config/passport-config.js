//aca va todo lo de passport
//passport siempre requiere :usuario y contraseña
import passport from "passport";
import local from "passport-local" //importamos local
import { createHash, isValidPassword } from "../utlis/createpassword.js";
import User from "../dao/models/user.model.js"
import GitHubStrategy from "passport-github2"
import config from "./index.js";

const {clientIdGH,clientSecretGH} = config
const LocalStrategy = local.Strategy // instanciamos

const inicailizePassport  = () =>{
    passport.use(
        'register', new LocalStrategy(
          { passReqToCallback: true, usernameField: 'email' },
          async (req, username, password, done) => {
            const { firts_name, last_name, email, } = req.body;
            try {
              const user = await User.findOne({ email: username });
              if (user) {
                console.log("email exist")
                return done(null, false);
              }
    
              const newUserInfo = {
                firts_name,
                last_name,
                email,
                password: createHash(password),
              };
    
              const newUser = await User.create(newUserInfo);
    
              return done(null, newUser);
            } catch (error) { 
              return done(error);
            }
          }
        )
      );
  passport.serializeUser((user,done) =>{
    console.log("este",user)
    done(null,user._id)
  })

  passport.deserializeUser(async(id,done) =>{
    console.log("vas",id)
    try{
        const user = await User.findById(id)
        done(null,user)
    }catch(err){
        done(err)
    }
  })
  passport.use("login", new LocalStrategy(
    {passReqToCallback:true,usernameField:"email"}, async (req,username,password,done) =>{
        console.log("aaaaa")
        try{
            const user = await User.findOne({email:username})
            if(!user){ console.log("No existe el usuario"); return done(null,false)}
            if(!isValidPassword(user,password)) return done(null,false)
            return done(null,user)
        }catch(err){
           return done(err)
        }
    }
  ))

  passport.use("github",new GitHubStrategy({
    clientID: clientIdGH,
    clientSecret:clientSecretGH,
    callbackURL : "http://localhost:8080/auth/githubcallback"
  },async(accessToken,refreshToke,profile,done)=>{
        try{
            console.log(profile)
            const user = await User.findOne({email:profile._json.email})

            if(user) return done(null,user)

            const newUserInfo = {
                firts_name:profile._json.login,
                last_name:"",
                age:18,
                email:profile._json.email,
                password:""
            }
            
            const create = await User.create(newUserInfo)
            return done(null,create)
        }catch(err){
            done(err)
        }
  }))
}
export default inicailizePassport
