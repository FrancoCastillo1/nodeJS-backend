/* import mensajeManager from "../../dao/messagesManager.js" */
/* console.log(mensajeManager) */
const input = document.querySelector("#inputText")
const submit = document.querySelector("#submitB")
const sectionM = document.querySelector(".mensajes")

const registarUser = prompt("introduce tu nombre pa")
const socket = io()

let arrayRecuperacion = []
let iterador = 0
socket.on("nuevoMensaje",data=>{
   const mensajesRp = sectionM.innerHTML
   iterador < 1 && arrayRecuperacion.push(mensajesRp)
   sectionM.innerHTML = ""
   arrayRecuperacion.forEach((item) => sectionM.innerHTML += item  )
   data.forEach(element => {
      sectionM.innerHTML +=element
  });
  iterador++
})
submit.addEventListener("click",async()=>{
    if(input.value.length > 2  && registarUser.length > 4 ){
       /*  const enviar = await mensajeManager.postMessages(registarUser,input.value)
        if(!enviar) return alert("registarte bien") */
        let mensaje = `<div class="mensaje">
        <span>${registarUser}:</span> <span>${input.value}</span>
        </div> `
        socket.emit("message",mensaje)
    }
})