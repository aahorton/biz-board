import { getPortId, Port } from "./port";

export type BlockId = string;
export type Block = {
  id: string;
  name: string;
  type: string;
  data: string;

  x: number;
  y: number;

  inputs: Relation[];
  outputs: Relation[];
};

export type RelationId = string;
export type Relation = {
  id: RelationId;
  outputId: string;
  outputPort: string;
  inputId: string;
  inputPort: string;
};

export const blocksRelations = (blocks: Block[]): Relation[] =>
  blocks.flatMap((block) => block.inputs);

export const getBlocksRecord = (blocks: Block[]): Record<BlockId, Block> => {
  return blocks.reduce<Record<BlockId, Block>>((acc, block) => {
    acc[block.id] = block;
    return acc;
  }, {});
};

export const relationFromPorts = (portA: Port, portB: Port) => {
  return portA.type === "input"
    ? {
        id: `${getPortId(portB)}:${getPortId(portA)}`,
        inputId: portA.blockId,
        inputPort: portA.port,
        outputId: portB.blockId,
        outputPort: portB.port,
      }
    : {
        id: `${getPortId(portA)}:${getPortId(portB)}`,
        inputId: portB.blockId,
        inputPort: portB.port,
        outputId: portA.blockId,
        outputPort: portA.port,
      };
};
