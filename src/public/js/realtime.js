const secProducts = document.querySelector(".sectionProducts")

const socket = io()
console.log(socket)
socket.on("cambiosEcomerse",(data)=>{
    console.log("ddsadsd",data)
    secProducts.innerHTML = ""
    data.forEach(element => {
        const divProduct = document.createElement("DIV")
        divProduct.innerHTML = `
        <div class="info">
            <div class="header">
                <h2>Nombre del producto:${element.title}</h2>
                <p>id del producto:${element._id}</p> 
            </div>
            <div class="body">
                <p>Descripción:${element.description}</p>
            </div>
            <div class="footer">
                <p>precio:${element.price}</p>
                <p>staus:${element.status}</p>
                <p>stock:${element.stock}</p>
                <p>categoria:${element.category}</p>
            </div>
        </div>`
        secProducts.appendChild(divProduct)
    });
})