const buscadorPrincipal = document.getElementById("buscador");

const referencePrincipal = document.getElementById("reference");

const sumador = document.getElementById("incrementar");

const restador = document.getElementById("decrementar");

const cantidad = document.getElementById("cantidad");

localStorage.setItem("cantidad", "1");

console.log(cantidad);

referencePrincipal.addEventListener("input", () => {

    localStorage.setItem("reference", referencePrincipal.value);
    
})

buscadorPrincipal.addEventListener("click", () => {

    window.location.replace("./tienda.html");
    
})

sumador.addEventListener("click", () => {

    let aux = localStorage.getItem("cantidad");

    localStorage.setItem("cantidad", parseInt(aux) + 1);

    cantidad.textContent = parseInt(aux) + 1;
    
})
restador.addEventListener("click", () => {

    let aux = localStorage.getItem("cantidad");

    if(parseInt(aux) > 1){

        localStorage.setItem("cantidad", parseInt(aux) - 1);

        cantidad.textContent = parseInt(aux) - 1;
    }
    
})

function getID() {

    let reference = localStorage.getItem("item");

    return reference;
}


fetch('http://localhost:9000/item/' + getID(), {mode: 'cors'})
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {

        //Cargo la imagen

        let item = data[0];
                
        const imgContainer = document.getElementById("productImage");

        const img = document.createElement("img");

        img.classList.add("intefaceImageProduct");
        
        img.setAttribute("src", item.img);

        imgContainer.appendChild(img);

        //Cargo la info

        //Cargo titulo y desc

        const container = document.getElementById("infoProductContainer");

        const nombre = document.createElement("h5");
        const desc = document.createElement("p");

        nombre.classList.add("card-title");
        desc.classList.add("card-text");

        nombre.textContent = item.name;
        desc.textContent = item.description;

        container.appendChild(nombre);
        container.appendChild(desc);

        //Cargo promo y precio

        if (item.deal != undefined && item.deal != ""){

            const row = document.createElement("div");
            const col = document.createElement("div");
            const col4 = document.createElement("div");
            const deal = document.createElement("h5");
            const dealName = document.createElement("p");
            const precio = document.createElement("h3");


            row.classList.add("row");
            col.classList.add("col-md-3");
            col4.classList.add("col-md-4");
            deal.classList.add("text-muted");
            deal.classList.add("text-decoration-line-through");
            dealName.classList.add("fw-bold");
            
            deal.textContent = "$" + item.deal;
            dealName.textContent = item.dealName;
            precio.textContent = "$" + item.price;

            container.appendChild(row);
            row.appendChild(col);
            row.appendChild(col4);
            col.appendChild(deal);
            col4.appendChild(dealName);
            container.appendChild(precio);

            const medios = document.getElementById("contenedorFijos");
            medios.remove(medios);
            container.appendChild(medios);
       
        }


    })
    .catch(function(error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Parece que hubo un problema, intente mas tarde.'
          })
        console.log(error);
    });