const nextButton = document.getElementById("moveToNextPage");
const addIncome = document.getElementById("añadirIncome");
nextButton.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("📩 Formulario detectado, se detuvo el refresh");

  const userId = localStorage.getItem("userId");
  console.log("🔑 userId:", userId);

  if (!userId || userId === "null") {
    alert("❌ User ID not found. Please login first.");
    window.location.href = "index.html"; // Go back to first form
    return;
  }

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


    // ✅ FIX: Use 'res' instead of 'response'
    const data = await res.json();
    console.log("📡 Response from PATCH:", data);
    
  } catch (err) {
    console.error("🔥 Error en fetch:", err);
    alert("⚠️ Error: " + err.message);
  } finally {
    window.location.href = "IngresoInfoTres.html";
  }
});

addIncome.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("📩 Formulario detectado, se detuvo el refresh");

  const userId = localStorage.getItem("userId");
  console.log("🔑 userId:", userId);

  if (!userId || userId === "null") {
    alert("❌ User ID not found. Please login first.");
    window.location.href = "index.html"; // Go back to first form
    return;
  }

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


    // ✅ FIX: Use 'res' instead of 'response'
    const data = await res.json();
    console.log("📡 Response from PATCH:", data);
    
  } catch (err) {
    console.error("🔥 Error en fetch:", err);
    alert("⚠️ Error: " + err.message);
  } finally {
    window.location.href = "IngresoInfoTres.html";
  }
});