
function filterCategory(category, subCategory, reference) {

    fetch('http://192.168.0.15:9000/items', {mode: 'cors'})
        .then(function(response) {
        return response.json();
        })
        .then(function(data) {
                
            const container = document.getElementById('contenedorProductos');

            const aux = document.getElementById('allItems');
            if (aux != null) container.removeChild(aux);
            else container.removeChild(container.lastChild);
            

            const row = document.createElement('div');
            row.classList.add("row");
            container.appendChild(row);
            
            if (category == undefined && subCategory == undefined) row.id = "allItems";
            else row.id = category + "Items";

            data.forEach(element => {
            
                
                if ((element.category == category && subCategory == undefined) 
                || (element.category == category && subCategory == element.subCategory) ) {
                    const newItem = makeItem(element.ID, element.img, element.subCategory, element.name, element.description, element.price);
                    row.appendChild(newItem);
                }
                
                if ((category == undefined && subCategory == undefined) && (reference == undefined)) {
                    const newItem = makeItem(element.ID, element.img, element.subCategory, element.name, element.description, element.price);
                    row.appendChild(newItem);
                }
                if ((category == undefined && subCategory == undefined) && (reference != undefined)) {
                    if (element.name.toUpperCase().includes(reference.toUpperCase())) {
                        const newItem = makeItem(element.ID, element.img, element.subCategory, element.name, element.description, element.price);
                        row.appendChild(newItem);
                    }
                }
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
}


const buscador = document.getElementById("buscador");

const reference = document.getElementById("reference");

reference.addEventListener("input", () => {

    localStorage.setItem("reference", reference.value);
    
})

buscador.addEventListener("click", () => {

    let aux = localStorage.getItem("reference");
    filterCategory(undefined, undefined, aux);
    localStorage.setItem("reference", "undefined");
    reference.value = "";
})