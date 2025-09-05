const btn1 = document.getElementById("btn1")

function seleccionButton1(btn1){

    if(btn1.classList.contains("seleccionado1")){
        btn1.classList.remove("seleccionado1", "seleccionado");
    } else{
        btn1.classList.add("seleccionado1", "seleccionado")
    }
   
}

const btn2 = document.getElementById("btn2")

function seleccionButton2(btn2){

    if(btn2.classList.contains("seleccionado2")){
        btn2.classList.remove("seleccionado2", "seleccionado");
    } else{
        btn2.classList.add("seleccionado2", "seleccionado")
    }
   
}

const btn3 = document.getElementById("btn3")

function seleccionButton3(btn3){

    if(btn3.classList.contains("seleccionado3")){
        btn3.classList.remove("seleccionado3", "seleccionado");
    } else{
        btn3.classList.add("seleccionado3", "seleccionado")
    }
   
}

const btn4 = document.getElementById("btn4")

function seleccionButton4(btn4){

    if(btn4.classList.contains("seleccionado4")){
        btn4.classList.remove("seleccionado4", "seleccionado");
    } else{
        btn4.classList.add("seleccionado4", "seleccionado")
    }
   
}

const btn5 = document.getElementById("btn5")

function seleccionButton5(btn5){

    if(btn5.classList.contains("seleccionado5")){
        btn5.classList.remove("seleccionado5", "seleccionado");
    } else{
        btn5.classList.add("seleccionado5", "seleccionado")
    }
   
}

document.getElementById("miFormulario").addEventListener("submit", async (e) => {
    e.preventDefault();

    const seleccionados = [];

    document.querySelectorAll(".seleccionado").forEach(b => {
        seleccionados.push(b.innerText);
    });

    

    const datos = {
        name: document.getElementById("nombre").value,
        password: document.getElementById("password").value,
        email: document.getElementById("email").value,
        seleccionados
    }

    try {
        let res = await fetch("http://localhost:3000/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        console.log("📡 Respuesta recibida:", res);
        
        // ✅ WAIT FOR THE RESPONSE DATA
        const data = await res.json();
        console.log("📦 Data received:", data);
        
        if (data.ok) {
            // ✅ NOW STORE THE USER ID FROM THE SERVER
            localStorage.setItem("userId", data.userId);
            console.log("✅ Stored userId:", data.userId);
            
            // ✅ THEN REDIRECT
            
        } else {
            alert("❌ Error creating user: " + data.error);
        }

    } catch (err) {
        console.error("🔥 Error:", err);
        alert("Error al conectar con el servidor");
    }finally{
        window.location.href = "IngresoInfoDos.html";
    }
    // ✅ REMOVE THE finally BLOCK - only redirect on success
});