
async function filterCategory(category, subCategory) {

    fetch('http://localhost:9000/items', {mode: 'cors'})
        .then(function(response) {
        return response.json();
        })
        .then(function(data) {
                
            const container = document.getElementById('contenedorProductos');

            const aux = document.getElementById('allItems');
            container.removeChild(aux);

            const row = document.createElement('div');
            row.classList.add("row");
            row.id = category + "Items";
            container.appendChild(row);

            data.forEach(element => {
            
                
                if ((element.category == category && subCategory == undefined) 
                || (element.category == category && subCategory == element.subCategory) ) {
                    const newItem = makeItem(element.ID, element.img, element.subCategory, element.name, element.description, element.price);
                    row.appendChild(newItem);
                    
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
