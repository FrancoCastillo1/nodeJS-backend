import fetchDataShared from "./shared/fetch.js"

const form = document.querySelector("form")
form.addEventListener("submit",async(e) =>{
    e.preventDefault()
    const dataForm = new FormData(form)
    const obj = {}

    dataForm.forEach((value,name) => obj[name] = value)
    const url = "/auth/restorepassword"
    const method = "PATCH"
    const headers = {
        "Content-Type": "application/json",
    }
    const body = JSON.stringify(obj)

    try{
        const fetch = await fetchDataShared(url,headers,method,body)
        const json = await fetch.json()
        return json
    }catch(err){
        return err
    }
})