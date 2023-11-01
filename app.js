/*
                    Cada uno de estos por tarjeta y un row por cada fila
                    
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <img src="./image/pc.jpg" alt="">
                            <div class="card-body">
                                <p class="card-text text-muted">Computadoras</p>
                                <h5 class="card-title">HP Omen 15</h5>
                                <p class="card-text">HP OMEN i5 7th gen GTX 1050 16GB RAM</p>
                                <p class="card-text">$250000</p>
                            </div>
                        </div>
                    </div>
*/

function makeItem (id, url, categoria, nombre, descripcion, precio) {

    const col = document.createElement("div");
    const card = document.createElement("div");
    const img = document.createElement("img");
    const body = document.createElement("div");
    const cat = document.createElement("p");
    const tittle = document.createElement("h5");
    const desc = document.createElement("p");
    const price = document.createElement("p");

    col.id = id;
    img.setAttribute("src", url);
    cat.textContent = categoria;
    tittle.textContent = nombre;
    desc.textContent = descripcion;
    price.textContent = '$' + precio;

    col.classList.add("col-md-4");
    card.classList.add("card");
    card.classList.add("mb-4");
    body.classList.add("card-body");
    cat.classList.add("card-text");
    cat.classList.add("text-muted");
    tittle.classList.add("card-title");
    desc.classList.add("card-text");
    price.classList.add("card-text");

    col.appendChild(card);
    card.appendChild(img);
    card.appendChild(body);
    body.appendChild(cat);
    body.appendChild(tittle);
    body.appendChild(desc);
    body.appendChild(price);
    
    return col;
    
}



fetch('http://localhost:9000/api', {mode: 'cors'})
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
        
        console.log(data);
        
        let contador = 0;

        const container = document.getElementById('contenedorProductos');
        const row = document.createElement('div');
        row.classList.add("row");
        container.appendChild(row);

        data.forEach(element => {
            
            if (contador == 0) {

                const row = document.createElement('div');
                row.classList.add("row");
                container.appendChild(row);
            }
            const newItem = makeItem(element.ID, element.img, element.category, element.name, element.description, element.price);
            row.appendChild(newItem);
            contador = contador +1;
            if(contador == 3)  contador = 0; 
            
        });

    })
    .catch(function(error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Parece que hubo un problema, intente mas tarde.'
          })
        console.log(error);
    });

