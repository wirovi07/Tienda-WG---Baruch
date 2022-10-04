
function ClickBuscar(){

    let busqueda = document.getElementById("busqueda").value;

    $.get("https://api.mercadolibre.com/sites/MCO/search?q="+busqueda, function(data){
    data.results.forEach(producto => {

        let row = `<div class="col-12 col-md-6 col-lg-4">
                    <div class="card m-2" >
                     <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${producto.thumbnail}" class="img-fluid rounded-start" alt="Image Product" style="padding: 10px;" >
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h7 class="card-title">${producto.title}</h7>
                                <p class="card-text"></p>
                                <p class="card-text"><small class="text-success" class="text-muted">$ ${(producto.price).toLocaleString('en-US')}</small></p>
                                <button class="btn btn-success" type="button" style="float:right; margin-bottom: 10px; text-align: end;">Agregar</button>
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