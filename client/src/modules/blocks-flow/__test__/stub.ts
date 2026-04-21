import { BlockType } from "../../manage-block/model/types";
import { Block, Relation } from "../domain/block";
import { BlockTypes } from "../domain/block-types";

export const testRelation: Relation = {
  id: "relation-1",
  outputId: "block-1",
  outputPort: "output-1",
  inputId: "block-2",
  inputPort: "input-1",
};
export const testBlock1: Block = {
  id: "block-1",
  name: "block-1",
  type: "block-type",
  data: "",
  x: 0,
  y: 0,
  inputs: [],
  outputs: [testRelation],
};

export const testBlock2: Block = {
  id: "block-2",
  name: "block-2",
  type: "block-type",
  data: "",
  x: 0,
  y: 0,
  inputs: [testRelation],
  outputs: [],
};

export const testBlockType: BlockTypes = {
  label: "label",
  type: "block-type",
  outputs: [
    {
      port: "output-1",
      label: "output-1",
    },
  ],
  inputs: [
    {
      port: "input-1",
      label: "input-1",
    },
  ],
};
