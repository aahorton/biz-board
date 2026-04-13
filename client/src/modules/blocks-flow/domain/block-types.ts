import { memoize } from "lodash";

export type PortConfig = {
  port: string;
  label: string;
};

export type BlockTypes = {
  type: string;
  label: string;
  outputs?: PortConfig[];
  inputs?: PortConfig[];
};

export type BlockTypesRecord = Record<string, BlockTypes | undefined>;

export const getBlockTypesRecord = memoize(
  (blockTypes: BlockTypes[]): BlockTypesRecord => {
    const result: BlockTypesRecord = {};
    for (const blockType of blockTypes) {
      result[blockType.type] = blockType;
    }
    return result;
  }
);
