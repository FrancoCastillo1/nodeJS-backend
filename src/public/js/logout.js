const form = document.querySelector("form")

form.addEventListener("submit",async(e) =>{
    e.preventDefault()
    if(!document.cookie) return alert("Ya hiciste un logout")
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
        const res = await get.json()
    }catch(err){
        console.log(err)
        alert("No se pudo hacer logout")
    }
})