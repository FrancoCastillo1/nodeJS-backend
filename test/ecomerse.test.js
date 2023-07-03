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
            firts_name:"Usuario",
            last_name:"Malo",
            auth_ide:"xddd@gmail.com",
            password:"1234aa6"
        }
      /*   it("Se debe registar al usuario en la db",async()=>{
            const {statusCode,ok} = await requester.post("/auth").send(newUser)
            expect(statusCode).to.be.equal(201)
            expect(ok).to.be.true
        })  */
        it("Se debe logear al usuario y devolver una cookie",async()=>{
            const newUserLogin = {
                auth_ide:newUser.auth_ide,
                password:newUser.password,
            }
            const {statusCode,body,ok,headers} = await requester.post("/auth/login").send(newUserLogin)
            expect(statusCode).to.be.equal(200)
            expect(ok).to.be.true
            const headersas = headers["set-cookie"]
            console.log(headersas)
            const headersCookie = headers["set-cookie"][0]
            expect(headersCookie).to.be.a("string")

            cookie.name = headersCookie.split("=")[0]
            cookie.content = headersCookie.split("=")[1]
            cookie.total_cookie = headersCookie

            expect(cookie.name).to.be.equal("authToken")
        })
    })
    /* describe("Test de productos",()=>{
        let id;
        it("El endpoint /api/products POST se debe crear correctamente",async()=>{
            const product = {
                title:"miProducti",
                price:623,
                stock:232,
                category:"celulares",
                description:"celu samnsumg",
            }

            const {statusCode,body:{content}} =  await requester.post("/api/products").send(product).set("Cookie",[`${cookie.total_cookie}`])
            console.log("naa",content, typeof content._id)
            expect(statusCode).to.be.equal(201)
            expect(content).to.be.an('object')
            expect(content).to.have.property("_id").and.satisfy(id => id.length > 13)
            id = content._id.toString()
            console.log(id)
        })
        it("El endpoint /api/products/{:id} GET debe obtener el producto por id",async()=>{
            const {statusCode,body:{payload}} = await requester.get(`/api/products/${id}`).set("Cookie",[`${cookie.total_cookie}`])
            console.log(payload)
            expect(payload).to.have.property("creator")
            expect(statusCode).to.be.equal(200)
        })
        it("El endpoint /api/products/{:id} PATCH debe actualizar el producto por id",async()=>{
            const {statusCode,body} = await requester.patch(`/api/products/${id}`).set("Cookie",[`${cookie.total_cookie}`])
            console.log(body)
            expect(statusCode).to.be.equal(200)
        })
        it("El endpoint /api/products GET debe obtener todos los productos",async()=>{
            const {statusCode,body} = await requester.get("/api/products").set("Cookie",[`${cookie.total_cookie}`])
            console.log(body)
            expect(statusCode).to.be.equal(200)
        })
        it("El endpoint /api/products/{:id} DELETE debe eliminar el producto por id",async()=>{
            const {statusCode,body} = await requester.delete(`/api/products/${id}`).set("Cookie",[`${cookie.total_cookie}`])
            console.log(body)
            expect(statusCode).to.be.equal(204)
        })
    }) */
    /* describe("Test del carrito",async()=>{
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
    }) */
})