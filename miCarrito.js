
/*
<div class="col-md-4">
    <div class="card">
        <div class="row">
            <div class="col-md-6">
                <img class="carritoImgItem" src="./image/pc.jpg" alt="">
            </div>
            <div class="col-md-6">
                <div class="card-body">
                    <h5 class="card-title">HP Omen 15</h5>
                    <p class="card-text">$250000</p>
                    <button class="btn btn-danger">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
</div>
*/
function makeCarritoItem(item) {

    const carrito = document.getElementById("carritoContainer");

    const col4 = document.createElement("div");
    const card = document.createElement("div");
    const row = document.createElement("div");
    const col6 = document.createElement("div");
    const col62 = document.createElement("div");
    const body = document.createElement("div");

    const img = document.createElement("img");
    const tt = document.createElement("h5");
    const desc = document.createElement("p");
    const btn = document.createElement("button");

    col4.classList.add("col-md-4");
    card.classList.add("card");
    row.classList.add("row");
    col6.classList.add("col-md-6");
    col62.classList.add("col-md-6");
    body.classList.add("card-body");

    img.classList.add("carritoImgItem");
    tt.classList.add("card-title");
    img.classList.add("card-text");
    btn.classList.add("btn");
    btn.classList.add("btn-danger");

    col4.id = "cont" + item.ID;
    
    tt.textContent = item.cantidad + "x " + item.name;
    tt.id = "tt" + item.ID;
    desc.textContent = "$" + item.price;
    btn.textContent = "Eliminar";
    btn.id = "btn" + item.ID;

    btn.addEventListener("click", () => {

        let carrito = JSON.parse(localStorage.getItem("carrito"));

        let lista = [];

        let total = 0;

        if (carrito != undefined){

            carrito.forEach(element => {

                lista.push(element);
                
                total = total + (element.price * element.cantidad);
            });
        }

        let producto = carrito.find((el) => ("btn" + el.ID) == btn.id);

        producto.cantidad = producto.cantidad - 1;

        if(producto.cantidad == 0) {

            const carrito = document.getElementById("carritoContainer");
            const container = document.getElementById("cont" + producto.ID);

            carrito.removeChild(container);

            console.log(lista.indexOf(producto));

            let index = lista.indexOf(producto);

            lista.splice(index, 1);
            console.log(lista);
        }
        else {
            const nombre = document.getElementById("tt" + producto.ID);
            console.log(producto.ID);
            console.log(nombre);
            nombre.textContent = producto.cantidad + "x " + producto.name;  
        }      

        total = total - producto.price;
        const textTotal = document.getElementById("totalCarrito");
        textTotal.textContent = "Total: $" + total;

        localStorage.setItem("carrito", JSON.stringify(lista));
    })

    img.setAttribute("src", item.img);
    

    carrito.appendChild(col4);
    col4.appendChild(card);
    card.appendChild(row);
    row.appendChild(col6);
    col6.appendChild(img);
    row.appendChild(col62);
    col62.appendChild(body);
    body.appendChild(tt);
    body.appendChild(desc);
    body.appendChild(btn);
    
}

const buscadorPrincipal = document.getElementById("buscador");

const referencePrincipal = document.getElementById("reference");

referencePrincipal.addEventListener("input", () => {

    localStorage.setItem("reference", referencePrincipal.value);
    
})

buscadorPrincipal.addEventListener("click", () => {

    window.location.replace("./tienda.html");
    
})
const btncompra = document.getElementById("btncompra");
btncompra.addEventListener("click", () => {

    getlink();
    
    
})
//cargo el carrito

let carrito = localStorage.getItem("carrito");

if (carrito != undefined && carrito.length > 0) {

    carrito = JSON.parse(carrito);
    let total = 0;
    carrito.forEach(element => {
        
        makeCarritoItem(element);

        const textTotal = document.getElementById("totalCarrito");

        total = total + (element.price * element.cantidad);

        textTotal.textContent = "Total: $" + total;

    });
}
else {
    const carrito = document.getElementById("carritoContainer");

    const tt = document.createElement("h3");

    tt.textContent = "No hay ningun producto en su carrito";

    carrito.appendChild(tt);

    const textTotal = document.getElementById("totalCarrito");

    textTotal.textContent = "Total: $0"
    
}

function getlink (){
    let carrito = localStorage.getItem("carrito");

    let Total = 0;

    if (carrito != undefined && carrito.length > 0) {

        carrito = JSON.parse(carrito);
        carrito.forEach(element => { Total = Total + (element.price * element.cantidad); });
    }
    let pepe = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({total:Total}) 
    }
    
    const mensaje = {
        total : Total
    }
    
    fetch('http://192.168.0.15:9000/payment', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(mensaje) 
    })
    .then(response => response.json())
    .then(function(data) {

        console.log(mensaje.total);
        console.log(data.init_point);

        window.location.href = data.init_point;

    })
    .catch(function(error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Parece que hubo un problema, intente mas tarde.'
          })
        console.log(error);
    });
}
