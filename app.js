/*
                    Cada uno de estos por tarjeta y un row por cada fila
                    
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <div class="card-body">
                                <h5 class="card-title">Tarjeta 1</h5>
                                <p class="card-text">Contenido de la tarjeta 1.</p>
                            </div>
                        </div>
                    </div>
*/

function makeItem () {

    const div = document.createElement("div");
    
}



fetch('http://localhost:9000/api', {mode: 'cors'})
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
        
        console.log(data);


    })
    .catch(function(error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Parece que hubo un problema, intente mas tarde.'
          })
    });

