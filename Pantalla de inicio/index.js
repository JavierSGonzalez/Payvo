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