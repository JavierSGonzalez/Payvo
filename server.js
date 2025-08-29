import express from "express";
import { PrismaClient } from "@prisma/client"
import cors from "cors"
import bodyParser from "body-parser";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.post("/submit", async (req, res) => {
    console.log("datos recibidos en baquen", req.body);

    try{
        const { name, years, seleccionados, } = req.body;

        const user = await prisma.user.create({
            data: {
                name,
                years: years !== null ? years : null,
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

app.listen(3000, ()=>{
    console.log("Servidor corriendo en http://localhost:3000");
});