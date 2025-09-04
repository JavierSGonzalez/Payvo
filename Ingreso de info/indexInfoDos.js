document.getElementById("miFormulario").addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("📩 Formulario detectado, se detuvo el refresh");

  const userId = localStorage.getItem("userId");
  console.log("🔑 userId:", userId);

  const amountInput = document.getElementById("amount").value;
  const amountValue = amountInput !== "" ? Number(amountInput) : null;

  const datos = {
    name: document.getElementById("name").value,
    amount: amountValue,
    category: document.getElementById("category").value,
    frequency: document.getElementById("frequency").value,
    paymentday: document.getElementById("Payment-date").value,
  };

  console.log("📦 Datos a enviar:", datos);

  try {
    let res = await fetch(`http://localhost:3000/submit/info2/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    console.log("📡 Respuesta recibida:", res.status, res.ok);
    
    window.location.href = "IngresoInfoTres.html"

    
   
  } catch (err) {
    console.error("🔥 Error en fetch:", err);
    alert("⚠️ Llene todos los campos o revise el servidor");
  }
});
