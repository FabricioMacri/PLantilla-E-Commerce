//HACER CARRITO EN ITEM
//HACER CARRITO EN TIENDA Y AGREGAR PROMOS
//MEJORAR EL HUD CON PRODUCTOS CALIENTES Y MAS PROMOS

const buscadorPrincipal = document.getElementById("buscador");
const referencePrincipal = document.getElementById("reference");
const sumador = document.getElementById("incrementar");
const restador = document.getElementById("decrementar");
const cantidad = document.getElementById("cantidad");
const carrito = document.getElementById("agregarCarrito");

localStorage.setItem("cantidad", "1");

carrito.addEventListener("click", () => {

    let carrito = JSON.parse(localStorage.getItem("carrito"));

    let prod = JSON.parse(localStorage.getItem("producto"));

    prod.cantidad = localStorage.getItem("cantidad");

    let lista = [];

    let total = 0;

    if (carrito != undefined){

        carrito.forEach(element => {

            lista.push(element);
                
            total = total + (element.price * element.cantidad);
        });
    }
    lista.push(prod);

    total = total + (prod.price * prod.cantidad)
    const textTotal = document.getElementById("totalCarrito");
    textTotal.textContent = "Total: $" + total;

    makeCarritoItem(prod.name, prod.cantidad);

    localStorage.setItem("carrito", JSON.stringify(lista));
})

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

function makeCarritoItem(item, cant) {

    const carrito = document.getElementById("carritoContainer");

    const line = document.createElement("li");
    const ms = document.createElement("div");
    const fw = document.createElement("div");
    const pill = document.createElement("span");

    line.classList.add("list-group-item");
    line.classList.add("d-flex");
    line.classList.add("justify-content-between");
    line.classList.add("align-items-start");
    ms.classList.add("ms-2");
    ms.classList.add("me-auto");
    fw.classList.add("fw-bold");
    pill.classList.add("badge");
    pill.classList.add("bg-primary");
    pill.classList.add("rounded-pill");

    fw.textContent = item;
    pill.textContent = cant;

    carrito.appendChild(line);
    line.appendChild(ms);
    line.appendChild(pill);
    ms.appendChild(fw);




}

fetch('http://192.168.0.15:9000/item/' + getID(), {mode: 'cors'})
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {

        //Cargo la imagen

        console.log(data);

        let item = data[0];

        item.cantidad = 0;

        localStorage.setItem("producto", JSON.stringify(item)); 

        //cargo el carrito

        let carrito = localStorage.getItem("carrito");

        if (carrito != undefined) {

            carrito = JSON.parse(carrito);
            let total = 0;
            carrito.forEach(element => {
                
                makeCarritoItem(element.name, element.cantidad);

                const textTotal = document.getElementById("totalCarrito");

                total = total + (element.price * element.cantidad);

                textTotal.textContent = "Total: $" + total;

            });
        }
                
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
        const precio = document.createElement("h3");


        nombre.classList.add("card-title");
        desc.classList.add("card-text");

        nombre.textContent = item.name;
        desc.textContent = item.description;
        precio.textContent = "$" + item.price;

        container.appendChild(nombre);
        container.appendChild(desc);

        //Cargo promo y precio

        if (item.deal != undefined && item.deal != ""){

            const row = document.createElement("div");
            const col = document.createElement("div");
            const col4 = document.createElement("div");
            const deal = document.createElement("h5");
            const dealName = document.createElement("p");

            row.classList.add("row");
            col.classList.add("col-md-3");
            col4.classList.add("col-md-4");
            deal.classList.add("text-muted");
            deal.classList.add("text-decoration-line-through");
            dealName.classList.add("fw-bold");
            
            deal.textContent = "$" + item.deal;
            dealName.textContent = item.dealName;

            container.appendChild(row);
            row.appendChild(col);
            row.appendChild(col4);
            col.appendChild(deal);
            col4.appendChild(dealName);
       
        }

        container.appendChild(precio);

        const medios = document.getElementById("contenedorFijos");
        medios.remove(medios);
        container.appendChild(medios);


    })
    .catch(function(error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Parece que hubo un problema, intente mas tarde.'
          })
        console.log(error);
    });