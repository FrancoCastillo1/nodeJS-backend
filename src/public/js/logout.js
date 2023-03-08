const button = document.querySelector("button")

button.addEventListener("click",async(e) =>{
    const url = "/user/destroy"
    const get = await fetch(url)
    alert("sesion eliminada")
})