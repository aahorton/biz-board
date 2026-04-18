import { Block, BlockId } from "./block";

export type PortId = string;

export type Port = {
  blockId: BlockId;
  type: "input" | "output";
  port: string;
};

export const portsAreEqual = (a?: Port, b?: Port) => {
  return (
    a?.blockId === b?.blockId && a?.port === b?.port && a?.type === b?.type
  );
};

export const portIsAlreadyInUse = (blocks: Block[], port: Port) => {
  const block = blocks.find((b) => b.id === port.blockId);

  if (block) {
    if (
      port.type === "input" &&
      block.inputs.some((input) => input.inputPort === port.port)
    ) {
      return true;
    }

    if (
      port.type === "output" &&
      block.outputs.some((output) => output.outputPort === port.port)
    ) {
      return true;
    }
  }

  return false;
};

export const isPortTypesSame = (a?: Port, b?: Port) => {
  return a?.type === b?.type;
};

export const isPortBlocksSame = (a?: Port, b?: Port) => {
  return a?.blockId === b?.blockId;
};

export const getPortId = (port: Port): PortId => {
  return `${port.blockId}:${port.type}:${port.port}`;
};
