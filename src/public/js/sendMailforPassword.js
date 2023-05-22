import fetchDataShared from "./shared/fetch.js"

const form = document.querySelector("#formMail")
const register = document.querySelector(".register")

async function newRender(form,fetch){
    const json = await fetch.json()
    console.log(json)
    register.innerHTML = ""
    const divMail = document.createElement("DIV")
    divMail.innerHTML = `<div>
    <h2> Se envió el mail de restauración correctamente </h2>
    </div>
    <div>
    <p>Se envio el mail al ${form.emailforPassword}, recuerda que tenés una hora antes de que expire </p>
    </div>
    `
    register.appendChild(divMail)
}

console.log("a",form)
form.addEventListener("submit",async(e) =>{
    console.log("zero")

    const dataForm = new FormData(form)
    const obj = {}

    dataForm.forEach((value,name) => obj[name] = value)
    console.log("aad",obj)
    const url = "/auth/sendmailforpassword"
    const headers = {
        "Content-Type": "application/json",
    }
    const method = "POST"
    const body = JSON.stringify(obj)

    try{
        const fetch = await fetchDataShared(url,headers,method,body)
        return newRender(dataForm,fetch)
    }catch(err){
        return err
    }
})