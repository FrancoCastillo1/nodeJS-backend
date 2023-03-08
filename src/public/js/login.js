const form = document.querySelector(".formL")
console.log(form)
async function fetchF(url,headers,method,body){
    try{
        const get = await fetch(url,{
            headers,
            method,
            body,
        })
        return get
    }catch(e){
       return e
    }
}
form.addEventListener("submit",async(e)=>{
    e.preventDefault()
    console.log("xd")
    const data = new FormData(form)
    const obj = {}

    data.forEach((value,key) => obj[key] = value)

    const url = "/user/login"
    const headers ={
        "Content-Type": "application/json",
    }
    const method = "POST"
    const body = JSON.stringify(obj)
    let result = await fetchF(url,headers,method,body)
    console.log(result)
})