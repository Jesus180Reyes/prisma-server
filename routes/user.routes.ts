import { Router,Request,Response } from "express";
import { prisma } from "../config/prisma/prisma";
import bcrypt from 'bcrypt';

const router = Router();


router.post("/", async(req:Request, res: Response)=> {
    const {nombre,password,email} = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword =   bcrypt.hashSync(password,salt);


    const user = await prisma.usuarios.create({
        data: {
            nombre: nombre,
            password: hashedPassword,
            email: email,
        }
    });

    res.json({
        ok: true,
        user,
    });
});
router.get("/", async(req:Request, res: Response)=> {
    const user = await prisma.usuarios.findMany();

    res.json({
        ok: true,
        user,
    });
});
router.get("/:id", async(req:Request, res: Response)=> {
    const {id}  = req.params;
    const user = await prisma.usuarios.findUnique({
        where: {id: Number(id)} 
    });

    res.json({
        ok: true,
        user,
    });
});

export default router;