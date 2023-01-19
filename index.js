import express from "express";
import routes from "./router/index.js";
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
console.log("aaa")
routes(app)
app.listen(8080, ()=> {
    console.log('the server is running');
});