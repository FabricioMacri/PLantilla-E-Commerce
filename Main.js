const buscadorPrincipal = document.getElementById("buscadorPrincipal");

const referencePrincipal = document.getElementById("referencePrincipal");

referencePrincipal.addEventListener("input", () => {

    localStorage.setItem("reference", referencePrincipal.value);
    
})

buscadorPrincipal.addEventListener("click", () => {

    window.location.replace("./tienda.html");
    
})