document.getElementById("miFormulario").addEventListener("submit", async (e)=>{
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    const datos = {
        name : document.getElementById("name").value,
        amount : document.getElementById("amount").value
    }


    try{ 
    let res = await fetch (`http://localhost:3000/submit/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(datos)
    });


    let respuesta = await res.json();
    console.log("Respuesta de servidor", respuesta);

    if (respuesta.ok){
        window.location.href="IngresoInfoTres.html"
    }else{
        alert("error al agregar ingreso" + respuesta.error)
    }
    }catch(err){
        console.log(err)
        alert("error al conectar con los servidores")
    }
})