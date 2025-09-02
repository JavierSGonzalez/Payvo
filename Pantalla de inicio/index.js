document.addEventListener("DOMContentLoaded", async ()=>{
    try{
        const res = await fetch("http://localhost:3000/api/activities");
        const data = await res.json();

        const table = document.getElementById("activity-table");

        data.forEach((item) => {
            const row = document.createElement("tr")
            row.innerHTML = `
            <td>${item.date}</td>
            <td>${item.type}</td>
            <td>${item.name}</td>
            <td>${item.type === "income" ? "+" : "-"}$${item.amount}</td>
            `
            table.appendChild(row);
        });
    }catch(err){
        console.log("Error cargando datos:", err);
    }
});

async function loadTopCategory() {
    try {
      const res = await fetch("http://localhost:3000/top-category");
      const data = await res.json();

      document.getElementById("top-category").textContent =
        `${data.category} - $${data._sum.amount}`;
    } catch (error) {
      console.error("Error cargando Top Category:", error);
    }
  }

  async function loadUpcoming() {
    try {
      const res = await fetch("http://localhost:3000/upcoming");
      const data = await res.json();

      const list = document.getElementById("upcoming-list");
      const amountLi = document.getElementById("amountLi")
      amountLi.innerHTML = "";
      list.innerHTML = "";

      data.forEach(expense => {
        const li = document.createElement("li");
        li.textContent = `${expense.name} - ${expense.billingday} `;
        const li2 = document.createElement("li")
        li2.textContent=`$${expense.amount}`

        amountLi.appendChild(li2)
        list.appendChild(li);
      });

     

    } catch (error) {
      console.error("Error cargando Upcoming:", error);
    }
  }

  // Ejecutar al cargar la página
  loadTopCategory();
  loadUpcoming();


