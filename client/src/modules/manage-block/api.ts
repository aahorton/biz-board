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

export const manageBlockApi = {
  createBlock,
};
