import chai from "chai";
import supertest from "supertest";
import config from "../src/config/index.js";

const expect = chai.expect
const {port} = config

const requester = supertest(`http://localhost:${port}`)

describe("Test del ecomerse",()=>{
    const cookie = {}
    describe("Test de autenticación",()=>{
        const newUser = {
            firts_name:"Deva23",
            last_name:"Jsa2",
            email:"developmaa2a2etd@gmail.com",
            password:"1234aa5"
        }
        /* it("Se debe registar al usuario en la db",async()=>{
            const {statusCode,ok} = await requester.post("/auth").send(newUser)
            expect(statusCode).to.be.equal(201)
            expect(ok).to.be.true
        })  lo borro debido a que funciona*/
        it("Se debe logear al usuario y devolver una cookie",async()=>{
            const newUserLogin = {
                email:newUser.email,
                password:newUser.password,
            }
            const {statusCode,body,ok,headers} = await requester.post("/auth/login").send(newUserLogin)
            expect(statusCode).to.be.equal(200)
            expect(ok).to.be.true
            const headersCookie = headers["set-cookie"][0]
            expect(headersCookie).to.be.a("string")

            cookie.name = headersCookie.split("=")[0]
            cookie.content = headersCookie.split("=")[1]
            cookie.total_cookie = headersCookie

            expect(cookie.name).to.be.equal("authToken")
        })
    })
    describe("Test de productos",()=>{
        it("El endpoint /api/products POST se debe crear correctamente",async()=>{
            const product = {
                title:"Samusmg SSaas",
                price:62,
                stock:23,
                category:"celulares",
                description:"celu samnsumg",
            }

            const {statusCode,body:{content}} =  await requester.post("/api/products").send(product).set("Cookie",[`${cookie.total_cookie}`])
            console.log("naa",content, typeof content._id)

            expect(statusCode).to.be.equal(201)
            expect(content).to.be.an('object')
            expect(content).to.have.property("_id").and.satisfy(id => id.length > 13)
        })
        it("El endpoint /api/products/{:id} DELETE debe eliminar el producto",async()=>{
            const {statusCode,body} = await requester.delete("/api/products/647ce5be70c01ef93af732a0").set("Cookie",[`${cookie.total_cookie}`])
            console.log(body)
            expect(statusCode).to.be.equal(200)
        })  
    })
    describe("Test del carrito",async()=>{
        beforeEach(function(){
            this.timeout(9000)
        })
        let idCart;
        it("Todos los carritos se deben poder obtener correctamente",async()=>{

            const {statusCode,body:{payload:{docs}}} = await requester.get("/api/cart?limit=5").set("Cookie",[`${cookie.total_cookie}`])
            expect(statusCode).to.be.equal(200)
            console.log(docs)
            expect(docs).to.be.an("array")
            expect(docs.every(item => typeof item == "object")).to.be.true
            console.log("paso")
        })
        it("Se debe crear un carrito",async()=>{
            const {statusCode,body:{payload}} = await requester.post("/api/cart").set("Cookie",[`${cookie.total_cookie}`]) 
            expect(statusCode).to.be.equal(201)
            expect(payload).to.be.a("string").and.satisfy(id => id.length > 23)
            idCart = payload
            console.log("qaa")
        })
        it("Se debe actualizar la cantidad un producto del carrito",async()=>{
            const upDateCantidad = {
                quankity: 8
            }
            const {statusCode,body:{payload}} = await requester.patch("/api/cart/63efdc2fce22018324f3dd0b/products/63ed5a9f9a2034864b9b67e5").send(upDateCantidad).set("Cookie",[`${cookie.total_cookie}`])
            expect(statusCode).to.be.equal(200)
            expect(payload.quankity).to.be.equal(upDateCantidad.quankity)
        })
        it("Se debe eliminar un producto de un carrito",async()=>{
            const {statusCode,body:{message}} = await requester.delete("api/cart/63efdc2fce22018324f3dd0b/products/63efe18bde64c482289568ff")
            console.log("ss",message)
            expect(statusCode).to.be.equal(200)
            expect(message).to.be.a("string")
            expect(message.includes("elimino") && message.includes("correctamente")).to.be.true
        })
        it("Se debe eliminar el carrito por id",async()=>{
            const {statusCode,body:{message}} = await requester.delete("api/cart/647cfb7fd31f586cea42740f")
            expect(statusCode).to.be.equal(200)
            expect(message).to.be.a("string")
            expect(message.includes("elimino") && message.includes("carrito")).to.be.true
            console.log("xddd")
        })
    })
})