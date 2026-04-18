import { BlockTypes } from "./domain/block-types";

async function getBlocksTypes() {
  return await fetch(`/api/blocks/types`).then(
    (res) => res.json() as Promise<BlockTypes[]>
  );
}

type CreateRelationBody = {
  inputId: string;
  outputId: string;
  outputPort: string;
  inputPort: string;
};

async function addRelation(data: CreateRelationBody) {
  return await fetch(`/api/blocks/relation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

async function deleteRelation(id: string) {
  return await fetch(`/api/blocks/relation/${id}`, {
    method: "DELETE",
  });
}

async function deleteBlock(id: string) {
  return await fetch(`/api/blocks/${id}`, {
    method: "DELETE",
  });
}

export const blocksFlowApi = {
  deleteBlock,
  addRelation,
  deleteRelation,
  getBlocksTypes,
};
