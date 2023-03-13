const form = document.querySelector(".formL")

async function fetchF(url,headers,method,body){
    try{
        const get = await fetch(url,{
            headers,
            method,
            body,
        })
        const json = await get.json()
        return json
    }catch(e){
       return e
    }
}

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
    let result = await fetchF(url,headers,method,body)
    console.log(result)
})