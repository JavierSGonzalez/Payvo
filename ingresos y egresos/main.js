const btnIncomes = document.getElementById('btnIncomes');
            const btnExpenses = document.getElementById('btnExpenses');
            const slider = document.getElementById('slider');
            const s1 = document.getElementById('seccion1');
            const s1a = document.getElementById('seccion1a');
            const s2 = document.getElementById('seccion2');
            const s2a = document.getElementById('seccion2a');
            

            btnIncomes.addEventListener('click', () => {
                slider.style.left = '0.25rem'; 
                s1.classList.remove('hidden');
                s1a.classList.remove('hidden');
                
                s2.classList.add('hidden');
                s2a.classList.add('hidden');
              
            });

            btnExpenses.addEventListener('click', () => {
                slider.style.left = '50%'; 
                s2.classList.remove('hidden');
                s2a.classList.remove('hidden');
                
                s1.classList.add('hidden');
                s1a.classList.add('hidden');
                
            });


document.addEventListener("DOMContentLoaded", async ()=>{
    try{
        const res = await fetch("http://localhost:3000/api/expenses");
        const data = await res.json();

        const table = document.getElementById("activity-table");

        data.forEach((item) => {
            const row = document.createElement("tr")
            row.innerHTML = `
            <td>${item.date}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.frequency}</td>
            <td>$${item.amount}</td>
            `
            table.appendChild(row);

        });

        const res2 = await fetch("http://localhost:3000/api/incomes");
        const data2 = await res2.json();

        const table2 = document.getElementById("activity-table2");

        data2.forEach((item) => {
            const row2 = document.createElement("tr")
            row2.innerHTML = `
            <td>${item.date}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.frequency}</td>
            <td>$${item.amount}</td>
            `
            table2.appendChild(row2);
        });
    }catch(err){
        console.log("Error cargando datos:", err);
    }
});



document.getElementById("añadirFormulario").addEventListener("submit", async (e)=>{
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    const amountInput = document.getElementById("amount").value;
    const amountValue = amountInput !== "" ? Number(amountInput) : null;

    const datos = {
        name : document.getElementById("name").value,
        amount : amountValue,
        category : document.getElementById("expenseType").value,
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

    
    }catch(err){
        console.log(err)
        alert("error al conectar con los servidores")
    }
});

document.getElementById("añadirFormulario2").addEventListener("submit", async (e)=>{
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    const amountInput = document.getElementById("amount2").value;
    const amountValue = amountInput !== "" ? Number(amountInput) : null;

    const datos = {
        name : document.getElementById("name2").value,
        amount : amountValue,
        category : document.getElementById("incomeType").value,
        frequency : document.getElementById("frequency2").value,
        billingday : document.getElementById("Payment-date").value
    }


    try{ 
    let res = await fetch (`http://localhost:3000/submit/info2/${userId}`, {
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

    
    }catch(err){
        console.log(err)
        alert("error al conectar con los servidores")
    }
});

