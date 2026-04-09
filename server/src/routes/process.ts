import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.get("/", async (req, res) => {
  const processes = await prisma.process.findMany();
  res.json(processes);
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  const newProcess = await prisma.process.create({ data: { name } });
  res.json(newProcess);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const process = await prisma.process.findUnique({
    where: { id },
    include: { blocks: { include: { inputs: true, outputs: true } } },
  });
  res.json(process);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const updatedProcess = await prisma.process.update({
    where: { id },
    data: { name },
  });
  res.json(updatedProcess);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.process.delete({ where: { id } });
  res.sendStatus(204);
});

export default router;
