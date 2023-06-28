const form = document.querySelector("form")

form.addEventListener("submit",async(e) =>{
    e.preventDefault()
    const url = "/api/users/logout"
    const headers ={
        "Content-Type": "application/json",
    }
    const method = "DELETE"
    try{
        const get = await fetch(url,{
            headers,
            method,
        })
        console.log(get)
        const res = await get.json()
        console.log(res)
    }catch(err){
        console.log(err)
        alert("No se pudo hacer logout")
    }
})