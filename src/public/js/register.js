const form = document.querySelector("#inputR")
console.log(form)

 form.addEventListener("submit",async(e)=>{
    console.log("is",form)
    e.preventDefault()
    const data = new FormData(form)
    const obj = {}
    data.forEach((value,key)=> obj[key] = value )
    console.log(obj)
    const url = "/auth"
    const headers = {
        "Content-Type": "application/json",
    }
    const method = "POST"
    const body = JSON.stringify(obj)
    const post = await fetch(url,{
        headers,
        method,
        body,
    })
    const json = await post.json()
    console.log(json)
})