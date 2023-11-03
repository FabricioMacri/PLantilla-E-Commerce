

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
        newCat.setAttribute("href", "#");
        group.appendChild(newCat);
    })

    accordion.appendChild(header);
    header.appendChild(btn);
    accordion.appendChild(collapse);
    collapse.appendChild(group);

    return accordion;
}


fetch('http://localhost:9000/items', {mode: 'cors'})
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
                
        let contador = 0;

        const container = document.getElementById('contenedorProductos');
        const row = document.createElement('div');
        row.classList.add("row");
        row.id = "allItems";
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

fetch('http://localhost:9000/search/categories', {mode: 'cors'})
.then(function(response) {
    return response.json();
    })
    .then(function(data) {
        
        const rawCategorias = data.map((el) => el.category);

        let categorias = rawCategorias.filter((item,index)=>{
            return rawCategorias.indexOf(item) === index;
        })

        const container = document.getElementById("categorias");

        categorias.forEach((element) => {

            let aux = [];

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

