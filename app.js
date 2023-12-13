// Generadores HTML para la tienda de categorias y productos

function makeItem (id, url, categoria, nombre, descripcion, precio) {

    const col = document.createElement("div");
    const link = document.createElement("a");
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
    link.addEventListener("click", () => {

        localStorage.setItem("item", id);

        window.location.replace("./item.html");
        
    })

    col.classList.add("col-md-4");
    card.classList.add("card");
    card.classList.add("mb-4");
    card.classList.add("contenedorProductos");
    body.classList.add("card-body");
    cat.classList.add("card-text");
    cat.classList.add("text-muted");
    tittle.classList.add("card-title");
    desc.classList.add("card-text");
    price.classList.add("card-text");

    col.appendChild(link);
    link.appendChild(card);
    card.appendChild(img);
    card.appendChild(body);
    body.appendChild(cat);
    body.appendChild(tittle);
    body.appendChild(desc);
    body.appendChild(price);
    
    return col;
    
}

function makeCategory(categoria, subCategorias) {

    const accordion = document.createElement("div");
    const header = document.createElement("h2");
    const btn = document.createElement("button");
    const collapse = document.createElement("div");
    const group = document.createElement("div");

    accordion.classList.add("accordion-item");
    header.classList.add("accordion-header");
    btn.classList.add("accordion-button");
    collapse.classList.add("accordion-collapse");
    collapse.classList.add("collapse");
    collapse.classList.add("show");
    group.classList.add("list-group");

    btn.setAttribute("type", "button");
    btn.setAttribute("data-bs-toggle", "collapse");
    btn.setAttribute("data-bs-target", "#" + categoria);
    btn.id = "btn" + categoria;
    btn.textContent = categoria;

    collapse.setAttribute("aria-labelledby", categoria);
    collapse.id = categoria;

    subCategorias.forEach((element) => {

        const newCat = document.createElement("a");
        newCat.classList.add("list-group-item");
        newCat.classList.add("list-group-item-action");
        newCat.textContent = element;
        newCat.setAttribute("type", "button");
        if (element == "Ver todos") {

            newCat.addEventListener("click", () => {

                filterCategory(categoria, undefined);
            })
        }
        else {

            newCat.addEventListener("click", () => {

                filterCategory(categoria, element);
            })

        }
        
        group.appendChild(newCat);
    })

    accordion.appendChild(header);
    header.appendChild(btn);
    accordion.appendChild(collapse);
    collapse.appendChild(group);

    return accordion;
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

fetch('https://e-commerce-api-ocoq.onrender.com/items', {mode: 'cors'})
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {

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
                
        const container = document.getElementById('contenedorProductos');
        const row = document.createElement('div');
        row.classList.add("row");
        row.id = "allItems";
        container.appendChild(row);

        let reference = localStorage.getItem("reference");

        if (reference == "undefined"){
            data.forEach(element => {
            
                const newItem = makeItem(element.ID, element.img, element.category, element.name, element.description, element.price);
                row.appendChild(newItem);            
            
            });
        }
        else {
            let aux = localStorage.getItem("reference");
            filterCategory(undefined, undefined, aux);
            localStorage.setItem("reference", "undefined");
            
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

fetch('https://e-commerce-api-ocoq.onrender.com/search/categories', {mode: 'cors'})
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {

        const rawCategorias = data.map((el) => el.category);

        let categorias = rawCategorias.filter((item,index)=>{
            return rawCategorias.indexOf(item) === index;
        })

        const container = document.getElementById("categorias");

        const allCat = document.getElementById("verTodo");

        allCat.addEventListener("click", () => {

            filterCategory(undefined, undefined);
        })

        categorias.forEach((element) => {

            let aux = ["Ver todos"];

            data.forEach((subElement) => {

                if (subElement.category == element) aux.push(subElement.subCategory)
            })
            let cat = makeCategory(element, aux);

            container.appendChild(cat);

        })
    })
    .catch(function(error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Parece que hubo un problema, intente mas tarde.'
        })
        console.log(error);
    });

