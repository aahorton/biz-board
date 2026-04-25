import { Edge, Node } from "@xyflow/react";
import { AppEdge, AppNode } from "./types";
import { Block, Relation, RelationId } from "../../domain/block";

export const relationToEdge = ({
  selectedRelations,
  relation,
}: {
  relation: Relation;
  selectedRelations: Record<RelationId, boolean>;
}): AppEdge => {
  return {
    id: relation.id,
    source: relation.outputId,
    sourceHandle: relation.outputPort,
    target: relation.inputId,
    targetHandle: relation.inputPort,
    selected: selectedRelations[relation.id] || false,
  };
};

export const blockToNode = ({
  block,
  blocks,
}: {
  block: Block;
  blocks: Block[];
}): AppNode => {
  return {
    id: block.id,
    type: "block",
    data: { block, blocks },

    position: {
      x: block.x,
      y: block.y,
    },
    style: {},
  };
};
