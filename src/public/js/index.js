const input = document.querySelector("#inputText")
const submit = document.querySelector("#submitB")
const sectionM = document.querySelector(".mensajes")
const productForm = document.querySelector("#productForm")
const sectionProducts = document.querySelector(".sectionProducts")

const socket = io()

const formReset = form =>{
    const newForm = new FormData(form)
    const obj = {}
    newForm.forEach((value,key) => obj[`${key}`]  = value)
    return JSON.stringify(obj)
}

productForm.addEventListener("click",async(e)=>{
    e.preventDefault()
    const url = "/realtimeproducts"
    const enviar = formReset(productForm)
    const headers ={
        "Content-Type":  "application-json" 
    } 
    const method = "POST"
    const body = enviar
    const post =  await fetch(url,{
        headers,
        method,
        body,
    })
    const response =await post.json()
    socket.emit("newProduct",{product:response.payload})
})

socket.on("product",(product)=>{
    const {title,description,price,thumbails,stock,category,status,_id} = product
    sectionProducts.innerHTML += ` 
    <div class="products">
        <div class="info">
        <div class="header">
            <h2>Nombre del producto:${title}</h2>
            <p>id del producto:${_id}</p> 
        </div>
        <div class="body">
            <p>Descripción:${description}</p>
        </div>
        <div class="footer">
            <p>precio:${price}</p>
            <p>staus:${status}</p>
            <p>stock:${stock}</p>
            <p>categoria:${category} </p>
        </div>
    </div>
    <div class="agregar">
      <button>Agregar al Carrito</button>
    </div>
    </div>`
})