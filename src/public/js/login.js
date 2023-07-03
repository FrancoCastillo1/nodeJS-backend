import fetchDataShared from "./shared/fetch.js"

const form = document.querySelector(".formL")
form.addEventListener("submit",async(e)=>{
    e.preventDefault()
    const data = new FormData(form)
    const obj = {}

    data.forEach((value,key) => obj[key] = value)

    const url = "/auth/login"
    const headers ={
        "Content-Type": "application/json",
    }
    const method = "POST"
    const body = JSON.stringify(obj)

    try{
        const fetch = await fetchDataShared(url,headers,method,body)
        return await fetch.json()
    }catch(err){
        return err
    }
})