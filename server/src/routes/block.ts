import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();
const router = Router();

const Webhook = z.object({
  url: z.string().url(),
  method: z.enum(["GET", "POST"]),
  query: z.string().optional(),
  headers: z.record(z.string()).optional(),
  body: z.string().optional(),
});

router.post("/", async (req, res) => {
  if (req.body.type === "webhook") {
    const result = Webhook.safeParse(JSON.parse(req.body.data));

    if (!result.success) {
      res.status(400).json(result.error);
      return;
    }
  }

  const { name, type, data, processId, x, y } = req.body;
  const newBlock = await prisma.processBlock.create({
    data: { name, type, data, processId, x, y },
  });
  res.json(newBlock);
});

const output = {
  port: "output",
  label: "Output",
};

const input = {
  port: "input",
  label: "Input",
};

const blockTypes = [
  {
    type: "start",
    label: "Start",
    outputs: [output],
    template: {
      fields: [
        {
          type: "select",
          label: "Start condition",
          name: "condition",
          required: true,
          options: [
            { value: "1", label: "Condition 1" },
            { value: "2", label: "Condition 2" },
            { value: "3", label: "Condition 3" },
          ],
        },
      ],
    },
  },
  {
    type: "webhook",
    label: "Call url",
    inputs: [input],
    outputs: [
      {
        port: "success",
        label: "Success",
      },
      {
        port: "error",
        label: "Error",
      },
    ],
    template: {
      fields: [
        {
          type: "input",
          label: "Url",
          name: "url",
          required: true,
        },
        {
          type: "select",
          label: "Method",
          name: "method",
          options: [
            { value: "GET", label: "GET" },
            { value: "POST", label: "POST" },
          ],
        },
      ],
    },
  },
  {
    type: "send-message",
    label: "Send message",
    inputs: [input],
    outputs: [output],
    template: {
      fields: [
        {
          type: "input",
          label: "Message",
          name: "message",
        },
      ],
    },
  },
  {
    type: "wait",
    label: "Wait",
    inputs: [input],
    outputs: [output],
    template: {
      fields: [
        {
          type: "input",
          label: "Wait time",
          default: "1000",
          name: "timeout",
          min: "0",
        },
      ],
    },
  },
  {
    type: "test",
    label: "Test Block",
    inputs: [input],
    outputs: [output],
    template: {
      fields: [
        {
          type: "input",
          label: "Wait time",
          default: "1000",
          name: "timeout",
          min: "0",
        },
        {
          type: "select",
          label: "Select",
          name: "value",
          options: [
            { value: "1", label: "Condition 1" },
            { value: "2", label: "Condition 2" },
            { value: "3", label: "Condition 3" },
          ],
        },
      ],
    },
  },
  {
    type: "end",
    inputs: [input],
    template: {
      fields: [],
    },
  },
];

router.get("/types", async (req, res) => {
  res.json(blockTypes);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const block = await prisma.processBlock.findUnique({
    where: { id },
    include: { outputs: true, inputs: true },
  });
  res.json(block);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (req.body.type === "webhook") {
    Webhook.parse(JSON.parse(req.body.data));
  }
  const { name, type, data, processId, x, y } = req.body;
  const updatedBlock = await prisma.processBlock.update({
    where: { id },
    data: { name, type, data, processId, x, y },
  });
  res.json(updatedBlock);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.processBlock.delete({ where: { id } });
  res.sendStatus(204);
});

router.post("/relation", async (req, res) => {
  const { inputId, inputPort, outputId, outputPort } = req.body;
  const newRelation = await prisma.processBlockRelation.create({
    data: {
      inputId,
      inputPort,
      outputId,
      outputPort,
    },
  });
  res.json(newRelation);
});

router.delete("/relation/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.processBlockRelation.delete({ where: { id } });
  res.sendStatus(204);
});

export default router;
