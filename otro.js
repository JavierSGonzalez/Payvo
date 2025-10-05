document.addEventListener("DOMContentLoaded", async ()=>{
    try{
        const res2 = await fetch("http://localhost:3000/api/incomes");
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