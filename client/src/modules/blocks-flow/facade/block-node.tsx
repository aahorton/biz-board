import { NodeProps } from "@xyflow/react";

import { BlockView } from "../ui/block";

import { Port } from "./port";
import { AppNode } from "../model/flow";
import { useBlockTypes } from "../../../generic-modules/block";

export const nodeTypes = { block: BlockNode };
export function BlockNode({ data: { block, blocks } }: NodeProps<AppNode>) {
  const blockTypes = useBlockTypes((state) => state.getData());
  return (
    <BlockView
      key={block.id}
      block={block}
      blockTypesRecord={blockTypes}
      renderPort={(type, config) => (
        <Port type={type} config={config} blockId={block.id} blocks={blocks} />
      )}
    />
  );
}
