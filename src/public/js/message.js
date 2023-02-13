import mensajeManager from "../../dao/messagesManager"

const input = document.querySelector("#inputText")
const submit = document.querySelector("#submitB")
const sectionM = document.querySelector(".mensajes")

const registarUser = prompt("introduce tu nombre pa")
const socket = io()

submit.addEventListener("click",async()=>{
    if(input.value.trimp().length > 2  && registarUser.length > 4 ){
        const enviar = await mensajeManager.postMessages(registarUser,input.value)
        if(!enviar) return alert("registarte bien")
        socket.emit("message",input.value)
    }
})
socket.on("nuevoMensaje",(data)=>{
    sectionM.innerHTML += data
})