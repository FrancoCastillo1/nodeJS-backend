//aca va todo lo de passport
//passport siempre requiere :usuario y contraseña
import passport from "passport";
import local from "passport-local" //importamos local
import { createHash, isValidPassword } from "../utlis/createpassword.js";
import User from "../DAO/mongo/models/user.model.js"
import GitHubStrategy from "passport-github2"
import config from "./index.js";
import GoogleSrategy from "passport-google-oauth20"
import { ExtractJwt,Strategy } from "passport-jwt";
import cookieExtractor from "../utlis/cookieExtractor.js";
import { generateToken } from "../utlis/jwt.utilis.js";

const {clientIdGH,clientSecretGH,clientIdGG,clientSecretGG} = config
const LocalStrategy = local.Strategy // instanciamos
const newGoogleSrategy = GoogleSrategy.Strategy
const JWTStrategy = Strategy

const {secretJWT} = config

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
              if(error.code == 11000){
                return done("El usuario ya existe")
              } 
              return done(error);
            }
          }
        )
      );
  passport.serializeUser((user,done) =>{
    done(null,user._id)
  })

  passport.deserializeUser(async(id,done) =>{
    try{
        const user = await User.findById(id)
        done(null,user)
    }catch(err){
        done(err)
    }
  })
  passport.use("login", new LocalStrategy(
    {passReqToCallback:true,usernameField:"email"}, async (req,username,password,done) =>{
        try{
            const user = await User.findOne({email:username})
            if(!user){ console.log("No existe el usuario"); return done(null,false)}
            if(!isValidPassword(user,password)) return done(null,false)
            return done(null,user)
        }catch(error){
           return done(error)
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
          if(err.code == 11000){
            return done("El usuario ya existe")
          } 
            done(err)
        }
  }))

  passport.use("google", new newGoogleSrategy(
     {
        clientID:clientIdGG,
        clientSecret:clientSecretGG,
        callbackURL:"http://localhost:8080/auth/google/callback"
     },
     async(accessToken,refreshToken,profile,done) =>{
        try{
            console.log(profile._json.sub)
            const user =  await User.findOne({googleId:profile._json.sub})
            if(user !== null || user) return done(null,user)
           const newUserInfo ={
                googleId:profile._json.sub,
                firts_name:profile._json.given_name,
                last_name:profile._json.family_name,
                password:"",
            }
            const newUser = await User.create(newUserInfo)
            return done(null,newUser)
        }catch(err){
          if(err.code == 11000)return  done(false)
            return done(err)
        }
     }   
  ))

  passport.use("current", new JWTStrategy(
    {
      jwtFromRequest:ExtractJwt.fromExtractors([cookieExtractor]),
      secretOrKey:secretJWT
    },
    async (jwt_payload,done) =>{
      try{
        return done(null,jwt_payload)
      }catch(err){
        return done(err)
      }
    }
  ))
}
export default inicailizePassport
