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

    const modal = document.getElementById("myModal");
    const modal2 = document.getElementById("myModal2");
    const openBtn1 = document.getElementById("openModal1");
    const openBtn2 = document.getElementById("openModal2"); 
    const closeBtn = document.getElementById("closeModal");
    const closeBtn2 = document.getElementById("closeModal2");

      openBtn1.addEventListener("click", () => {
        modal.classList.remove("hidden");
      });

      openBtn2.addEventListener("click", () => {
        modal2.classList.remove("hidden");
      });
   

    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    closeBtn2.addEventListener("click", () => {
      modal2.classList.add("hidden");
    });