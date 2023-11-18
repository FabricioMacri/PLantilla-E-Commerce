
/*
<li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
        <div class="fw-bold">HP Omen</div>
    </div>
    <span class="badge bg-primary rounded-pill">2</span>
</li>
*/

const buscadorPrincipal = document.getElementById("buscador");

const referencePrincipal = document.getElementById("reference");

referencePrincipal.addEventListener("input", () => {

    localStorage.setItem("reference", referencePrincipal.value);
    
})

buscadorPrincipal.addEventListener("click", () => {

    window.location.replace("./tienda.html");
    
})