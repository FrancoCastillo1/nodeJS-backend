const form = document.querySelector("#inputR")
console.log(form)

 form.addEventListener("submit",async(e)=>{
    console.log("is",form)
    e.preventDefault()
    const data = new FormData(form)
    console.log("xd",data)
    const obj = {}
    data.forEach((value,key)=> obj[key] = value )
    console.log(obj)
    const url = "/user"
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