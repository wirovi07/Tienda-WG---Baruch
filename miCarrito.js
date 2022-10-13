var total = 0

document.addEventListener("DOMContentLoaded", () => {
    
    let localCarrito = localStorage.getItem("carrito");

    let datosCarrito = JSON.parse(localCarrito);

    datosCarrito.forEach(producto => {
     let row = `
            <tr>
                <td>
                    <h6 class="title-elipsis" style="padding-top: 30px;">${producto.id}</h6>
                </td>
                <td>                    
                    <img src="${producto.imagen}" class="img-fluid rounded-start" alt="Image Product" style="padding: 5px; width: 120px;" >                    
                </td>
                <td>
                    <h6 class="title-elipsis" style="padding-top: 30px;">${producto.titulo}</h6>
                </td> 
                <td>
                    <h5 class="text-success" style="padding-top: 30px;">$ ${(producto.precio).toLocaleString('en-US')}</h5>                
                </td> 
                <td>
                </td>
            </tr>`   
            
            total = producto.precio + total;

            document.getElementById('valorTotalProduct').value = total.toLocaleString("en-US", {style: "currency",currency: "USD" });

       document.getElementById("listar").innerHTML += row;
    });

    
})

