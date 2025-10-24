const addIncome = document.getElementById("addIncome")
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
    billingday: document.getElementById("Payment-date").value,
  };

  console.log("📦 Datos a enviar:", datos);

  try {
    let res = await fetch(`http://localhost:3000/submit/info3/${userId}`, {
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
  }
});


document.addEventListener("DOMContentLoaded", async ()=>{
    try{
        const res2 = await fetch("http://localhost:3000/api/expenses");
        const data2 = await res2.json();

        const table2 = document.getElementById("activity-table2");

        data2.forEach((item) => {
            const row2 = document.createElement("tr")
            row2.innerHTML = `
            <td>${item.date}</td>
            <td>${item.name}</td>
            
            <td>$${item.amount}</td>
            `
            table2.appendChild(row2);
        });
    }catch(err){
        console.log("Error cargando datos:", err);
    }
});

const moveToNextPage = document.getElementById("moveToNextPage")
moveToNextPage.addEventListener("click", (i) => {
  window.location.href = "IngresoInfoSeis.html"
})