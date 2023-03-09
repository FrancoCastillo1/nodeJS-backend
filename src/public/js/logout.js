const button = document.querySelector("button")

button.addEventListener("click",async(e) =>{
    e.preventDefault()
    alert("sesion eliminada")
    const url = "/user/destroy"
    const headers = {
        "Content-Type": "application/json",
    }
    const get = await fetch(url,{
        headers,
    })
})