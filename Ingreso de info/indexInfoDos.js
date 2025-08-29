document.getElementById("miFormulario").addEventListener("submit", async (e)=>{
    e.preventDefault();

    const datos = {
        name : document.getElementById("name").value,
        amount : document.getElementById("amount").value
    }

    let res = await fetch ("http://localhost:3000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(datos)
    });

    let respuesta = await res.json();
    console.log("Respuesta de servidor", respuesta);

    if (respuesta.ok){

        window.location.href="IngresoInfoTres.html"
    }
})