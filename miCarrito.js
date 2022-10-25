
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

document.addEventListener("DOMContentLoaded", () => {
    
    imprimirCarrito();
    
})

function imprimirCarrito(){

    let total = 0;

   
    let localCarrito = localStorage.getItem("carrito");

    if(localCarrito){

        let datosCarrito = JSON.parse(localCarrito);

        document.getElementById("listar").innerHTML = "";

        document.getElementById('valorTotalProduct').value = "";

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
                            <input type="number" id="cantidad_${producto.id}" min="0" max="15" onchange="cambio('${producto.id}')" value="${producto.cantidad}" style="width: 40px;">
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

    }else{

        document.getElementById('valorTotalProduct').value = "";

        document.getElementById("listar").innerHTML = "";

    }

}

function eliminar(id){
   
    Swal.fire({
        title: 'Esta seguro?',
        text: "Quieres eliminar esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminalo!',
        cancelButtonText: 'Cancelar'

      }).then((result) => {
        if (result.isConfirmed) {

            let localCarrito = localStorage.getItem("carrito");

            let datosCarrito = JSON.parse(localCarrito);
        
            for(let i = 0; i < datosCarrito.length; i++){
                
                if(datosCarrito[i].id == id){
                   datosCarrito.splice(i, 1);           
                }1
            }
        
            localStorage.setItem("carrito", JSON.stringify(datosCarrito));
        
            imprimirCarrito();
        

          Swal.fire(
            'Eliminado!',
            'Tú archivo ha sido eliminado.',
            'success'
          )
        }
      })

}

function cambio(id){

    let cantidad = document.getElementById("cantidad_"+id).value; 
    
    let localCarrito = localStorage.getItem("carrito");

    let datosCarrito = JSON.parse(localCarrito);

    for(let i = 0; i < datosCarrito.length; i++){

        if(datosCarrito[i].id == id){
            datosCarrito[i].cantidad = cantidad;
        }

    }

    localStorage.setItem("carrito", JSON.stringify(datosCarrito));

    imprimirCarrito();    

}

function eliminarLocalStorage(){
    
    localStorage.removeItem('carrito');

    imprimirCarrito();

}





