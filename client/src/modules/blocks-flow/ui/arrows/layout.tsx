import { Block } from "../../domain/block";
import { getPortId } from "../../domain/port";
import { sumPosition } from "../../domain/position";
import { usePortPositions } from "../../view-model/use-ports-positions";
import styles from "./styles.module.css";

export function Layout({ blocks }: { blocks: Block[] }) {
  const portPositions = usePortPositions((state) => state.portPositions);

  let d = ``;

  const blocksRecord = blocks.reduce<Record<string, Block | undefined>>(
    (acc, block) => {
      acc[block.id] = block;
      return acc;
    },
    {}
  );

  for (const block of blocks) {
    for (const input of block.inputs) {
      const inputPortId = getPortId({
        blockId: input.inputId,
        port: input.inputPort,
        type: "input",
      });

      const outputPortId = getPortId({
        blockId: input.outputId,
        port: input.outputPort,
        type: "output",
      });

      const inputPortPosition = portPositions?.[inputPortId];
      const outputPortPosition = portPositions?.[outputPortId];
      const inputBlock = blocksRecord[input.inputId];
      const outputBlock = blocksRecord[input.outputId];

      if (
        !inputPortPosition ||
        !outputPortPosition ||
        !inputBlock ||
        !outputBlock
      ) {
        continue;
      }

      const inputPosition = sumPosition(inputBlock, inputPortPosition);
      const outputPosition = sumPosition(outputBlock, outputPortPosition);

      d += `M ${inputPosition.x} ${inputPosition.y} L ${outputPosition.x} ${outputPosition.y} `;
    }
  }
  return (
    <svg className={styles.arrows}>
      <path d={d} fill="none" stroke="black" />
    </svg>
  );
}
