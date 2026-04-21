export type CreateBlockBody = {
  processId: string;
  name: string;
  type: string;
  data: string;
  x: number;
  y: number;
};

async function createBlock(data: CreateBlockBody) {
  return await fetch(`/api/blocks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export type UpdateBlockBody = {
  blockId: string;
  processId: string;
  name: string;
  type: string;
  data: string;
};

async function updateBlock(data: UpdateBlockBody) {
  return await fetch(`/api/blocks/${data.blockId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export type GetBlockById = {
  id: string;
  name: string;
  type: string;
  data: string;
};

async function getBlockById(id: string) {
  return await fetch(`/api/blocks/${id}`).then(
    (res) => res.json() as Promise<GetBlockById>
  );
}

export const manageBlockApi = {
  createBlock,
  updateBlock,
  getBlockById,
};
