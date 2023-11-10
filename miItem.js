const buscadorPrincipal = document.getElementById("buscador");

const referencePrincipal = document.getElementById("reference");

referencePrincipal.addEventListener("input", () => {

    localStorage.setItem("reference", referencePrincipal.value);
    
})

buscadorPrincipal.addEventListener("click", () => {

    window.location.replace("./tienda.html");
    
})