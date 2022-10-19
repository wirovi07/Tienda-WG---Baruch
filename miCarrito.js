
document.addEventListener("DOMContentLoaded", () => {
    
    imprimirCarrito();
    
})

function imprimirCarrito(){

    let total = 0;

    let localCarrito = localStorage.getItem("carrito");

    let datosCarrito = JSON.parse(localCarrito);

    document.getElementById("listar").innerHTML = " ";

    datosCarrito.forEach(producto  => {
     let row = `
            <tr>
                <td>
                    <h6 class="title-elipsis" style="padding-top: 40px;">${producto.id}</h6>
                </td>
                <td>                    
                    <img src="${producto.imagen}" class="img-fluid rounded-start" alt="Image Product" style="padding: 5px; width: 120px;" >                    
                </td>
                <td>
                    <h6 class="title-elipsis" style="padding-top: 40px;">${producto.titulo}</h6>
                </td> 
                <td style="padding-top: 40px;">
                    <input type="number" min="0" max="15" value="${producto.cantidad}" style="width: 40px;">
                </td> 
                <td>
                    <h5 class="text-success" style="padding-top: 40px;">$ ${(producto.precio).toLocaleString('en-US')}</h5>                
                </td> 
                <td>
                  <h5 class="text-success" style="padding-top: 40px;">$ ${(parseInt(producto.precio) * parseInt(producto.cantidad)).toLocaleString('en-US')}</h5>                
                </td> 
                <td style="padding-top: 40px;">
                     <button type="button" class="btn btn-danger" onclick=eliminar('${producto.id}')>Eliminar</button>
                </td>
            </tr>`   
            
            total = (parseInt(producto.precio) * parseInt(producto.cantidad)) + total;

            document.getElementById('valorTotalProduct').value = total.toLocaleString("en-US", {style: "currency",currency: "USD" });

       document.getElementById("listar").innerHTML += row;
    });

}

function eliminar(id){
   
    let localCarrito = localStorage.getItem("carrito");

    let datosCarrito = JSON.parse(localCarrito);

    console.log(datosCarrito)

    for(let i = 0; i < datosCarrito.leng11th; i++){
        
        if(datosCarrito[i].id == id){
           datosCarrito.splice(i, 1);
           
        }
    }

    localStorage.setItem("carrito", JSON.stringify(datosCarrito));

    imprimirCarrito();

}



