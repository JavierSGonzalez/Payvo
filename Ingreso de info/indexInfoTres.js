document.getElementById("miFormulario").addEventListener("submit", async (e)=>{
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    const datos = {
        name : document.getElementById("name").value,
        amount : document.getElementById("amount").value,
        frequency : document.getElementById("frequency").value,
        billingday : document.getElementById("Billing-date").value
    }


    try{ 
    let res = await fetch (`http://localhost:3000/submit/info3/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(datos)
    });


    let respuesta;
    try {
      respuesta = await res.json();
    } catch {
      respuesta = {};
    }

    console.log("Respuesta HTTP:", res.status, res.ok);
    console.log("Respuesta JSON:", respuesta);

    
    if (!res.ok) {
      console.error("Error en servidor:", respuesta.error || "desconocido");
    }

    
    window.location.href = "IngresoInfoSeis.html";
    }catch(err){
        console.log(err)
        alert("error al conectar con los servidores")
    }
});



