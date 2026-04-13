import { Process } from "./model/types";

async function getById(processId: string) {
  return await fetch(`/api/processes/${processId}`).then(
    (res) => res.json() as Promise<Process>
  );
}

type CreateBlockBody = {
  processId: string;
  name: string;
  type: string;
  data: string;
  x: number;
  y: number;
};

async function createBlock(data: CreateBlockBody) {
  return await fetch(`/api/block`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

type CreateRelationBody = {
  inputId: string;
  outputId: string;
  outputPort: string;
  inputPort: string;
};

async function addRelation(data: CreateRelationBody) {
  return await fetch(`/api/block/relation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export const processApi = {
  getById,
  createBlock,
  addRelation,
};
