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

var productos = [];

function ClickBuscar(){

    let busqueda = document.getElementById("busqueda").value;

    $.get("https://api.mercadolibre.com/sites/MCO/search?q="+busqueda, function(data){
    data.results.forEach(producto => {

        let datosProducto = {
            imagen: producto.thumbnail,
            titulo: producto.title,
            precio: producto.price,
            id: producto.id,
            cantidad: 1,
        };

        productos.push(datosProducto);


        let row = `<div class="col-12 col-md-6 col-lg-4">
                    <div class="card m-2" >
                     <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${producto.thumbnail}" class="img-fluid rounded-start" alt="Image Product" style="padding: 10px;" >
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h7 class="card-title title-elipsis">${producto.title}</h7>
                                <p class="card-text"><small class="text-success" class="text-muted">$ ${(producto.price).toLocaleString('en-US')}</small></p>
                                <input type="number" id="cantidad_${producto.id}" min="0" max="15" value="${datosProducto.cantidad}" style="width: 40px;">
                                <button class="btn btn-success" onclick ="Agregar('${producto.id}');" type="button" style="float:right; margin-bottom: 10px; text-align: end;">Agregar</button>
                            </div>
                        </div>
                     </div>
                    </div> 
                   </div>      
                   `

       document.getElementById("listar").innerHTML += row;
  
        });
    })

}

function Agregar(id) {
    
   productos.forEach(p => {

    if(p.id == id){

        p.cantidad = document.getElementById("cantidad_"+p.id).value;   
        
        AgregarProductoLocalStorge(p);
    }

   });

}

function AgregarProductoLocalStorge(producto){
  
    let localCarrito = localStorage.getItem("carrito");

    if(localCarrito){
        let datosCarrito = JSON.parse(localCarrito); //JSON.parse => sirve para que de un string lo convierta a un objeto
       
        datosCarrito.push(producto);

        localStorage.setItem("carrito", JSON.stringify(datosCarrito));
    }else{
        localStorage.setItem("carrito", JSON.stringify([producto])); 
    }


    Toast.fire({
        icon: 'success',
        title: 'Agregado con éxito'
    })
}







