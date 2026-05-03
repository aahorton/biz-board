import { BlockTypes } from "./domain/block-types";

async function getBlocksTypes() {
  return await fetch(`/api/blocks/types`).then(
    (res) => res.json() as Promise<BlockTypes[]>
  );
}

export const blockApi = {
  getBlocksTypes,
};
