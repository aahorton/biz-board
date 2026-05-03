import { Block } from "../domain/block";
import { Position as Position } from "../domain/position";
import { ReactFlowContainer } from "../ui/react-flow-container";
import { Background, Controls, ReactFlow, useReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useDelete } from "./use-delete";
import { useCreateRelation } from "../model/create-relation";
import { useSelected } from "../model/use-selected";
import { nodeTypes } from "./block-node";
import { useEdges } from "./use-edges";
import { flowController } from "../model/flow/controller";
import { blockToNode } from "../model/flow";

export function BlocksFlow({
  blocks,
  onFlowClick,
  onChanged,
  onBlockClick,
}: {
  blocks: Block[];
  onFlowClick: (position: Position) => void;
  onBlockClick: (blockId: string) => void;
  onChanged: () => Promise<void>;
}) {
  const flow = useReactFlow();
  const edges = useEdges(blocks);
  const nodes = blocks.map((block) => blockToNode({ block, blocks }));

  const controller = flowController(
    [
      useDelete(onChanged),
      useCreateRelation({
        blocks,
        onSuccess: onChanged,
      }),
      useSelected((state) => state.handleAction),
      (action) => {
        action.type === "flowClick" && onFlowClick(action.payload.position);
        action.type === "blockClick" && onBlockClick(action.payload.blockId);
      },
    ],
    flow
  );

  return (
    <ReactFlowContainer>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        {...controller}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </ReactFlowContainer>
  );
}
