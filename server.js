import express from "express";
import { PrismaClient } from "@prisma/client"
import cors from "cors"
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static(__dirname))


app.post("/submit", async (req, res) => {
    console.log("datos recibidos en baquen", req.body);

    try{
        const { name, years, email, seleccionados, } = req.body;

        const user = await prisma.user.create({
            data: {
                name,
                years: years !== null ? years : null,
                email,
                seleccion:{
                    create:{
                        boton:{
                            create: seleccionados.map(sel => ({ text: sel }))
                        }
                    }
                }
            },
            include: { seleccion: {include: {boton: true}}}

        });
        console.log("Usuario guardado", user)
        res.json({ok: true, user});

    }catch(err){
        console.log("Error al guardar en prisma", err)
        res.status(500).json({ok: false, error: err.message});
    }

});

app.patch("/submit/info2/:id", async (req, res) => {
  
  try{ 
    const { name, amount, category, frequency, paymentday,  } = req.body;

  const updatedUser = await prisma.user.update({
    where: { id: Number(req.params.id) }, 
    data: {
      incomes: {
        create: { 
            name,
            amount: amount !== null ? amount : null,
            category,
            frequency,
            paymentday 
        } 
      }
    },
    include: { incomes: true }
  });
  res.json({ ok: true, user: updatedUser });
  console.log(updatedUser);
  }catch(err){
    console.log("error al mandar ingresos", err)
  }
});

app.patch("/submit/info3/:id", async (req, res) => {
  
  try{ 
    const { name, amount, category, frequency, billingday,  } = req.body;

  const updatedUser = await prisma.user.update({
    where: { id: Number(req.params.id) }, 
    data: {
      expense: {
        create: {
           name,
            amount: amount !== null ? amount : null, 
            category,
            frequency, 
            billingday 
        } 
      }
    },
    include: { expense: true }
  });
  res.json({ ok: true, user: updatedUser });
  console.log(updatedUser);
  }catch(err){
    console.log("error al mandar egresos", err)
  }
});

app.patch("/submit/info6/:id", async (req, res) => {
  
  try{
        const { goal, frequency, seleccionados, total } = req.body;

        const uptadedUserTres = await prisma.user.update({
          where: { id: Number(req.params.id) },
            data: {
                savingplan:{
                  create:{goal: goal !== null ? goal : null, frequency, selecciondos:{
                    create:{
                        botondos:{
                            create: seleccionados.map(sel => ({ text: sel }))
                        }
                    }
                }, total: total !== null ? total : null,
              }
                }
            },
            include: { savingplan: {include: { selecciondos: { include: { botondos: true}}}}}
        });
        res.json({ ok: true, user: uptadedUserTres });
    console.log(uptadedUserTres);
  }catch(err){
    console.log("error al mandar saving plan", err)
  }
});

app.get("/api/activities", async (req, res)=> {
  try{
    const incomes = await prisma.income.findMany({
      select: {id:true, name:true, amount:true, paymentday:true}
    });
    const expenses = await prisma.expense.findMany({
      select: {id:true, name:true, amount:true, billingday:true}
    });


    const incomeData = incomes.map((i) => ({
      id: i.id,
      type: "income",
      name: i.name,
      amount: i.amount,
      date: i.paymentday
    }));

    const expenseData = expenses.map((e) => ({
      id: e.id,
      type: "expense",
      name: e.name,
      amount: e.amount,
      date: e.billingday
    }));

    const activities = [...incomeData, ...expenseData];

    res.json(activities);
  }catch(error){
    console.log(error)
    res.status(500).json({error: "error al tener datos"})
  }
});

app.get("/api/expenses", async (req, res)=> {
  try{
    
    const expenses = await prisma.expense.findMany({
      select: {id:true, name:true, amount:true, frequency:true, category:true, billingday:true}
    });



    const expenseData = expenses.map((e) => ({
      id: e.id,
      type: "expense",
      name: e.name,
      amount: e.amount,
      frequency: e.frequency,
      category: e.category,
      date: e.billingday
    }));


    res.json(expenseData);
  }catch(error){
    console.log(error)
    res.status(500).json({error: "error al tener datos"})
  }
});


app.get("/api/incomes", async (req, res)=> {
  try{
    
    const incomes = await prisma.income.findMany({
      select: {id:true, name:true, amount:true, frequency:true, category:true, paymentday:true}
    });



    const incomeData = incomes.map((i) => ({
      id: i.id,
      type: "incomes",
      name: i.name,
      amount: i.amount,
      frequency: i.frequency,
      category: i.category,
      date: i.paymentday
    }));


    res.json(incomeData);
  }catch(error){
    console.log(error)
    res.status(500).json({error: "error al tener datos"})
  }
});

app.get("/top-category", async (req, res) => {
  try {
    const result = await prisma.expense.groupBy({
      by: ["category"],
      _sum: {
        amount: true,
      },
      orderBy: {
        _sum: {
          amount: "desc",
        },
      },
      take: 1, 
    });

    res.json(result[0]); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching top category" });
  }
});

app.get("/upcoming", async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: {
        billingday: "asc", 
      },
      take: 3,
    });

    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching upcoming expenses" });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running on http://localhost:3000");
});


app.listen(3000, ()=>{
    console.log("Servidor corriendo en http://localhost:3000");
});
