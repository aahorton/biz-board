import {
  Block,
  BlockId,
  getPortPosition,
  Relation,
  relationFromPorts,
} from "../../domain/block";
import { PortId } from "../../domain/port";
import { Position } from "../../domain/position";
import { useSelectedPortStore } from "./use-selected-port-store";

export function useOptimisticCreateRelation({
  portPositions,
  blocksRecord,
  relations,
}: {
  blocksRecord: Record<BlockId, Block>;
  portPositions: Record<PortId, Position>;
  relations: Relation[];
}) {
  const { selectedPort, selectedEndPort } = useSelectedPortStore();

  if (selectedPort && !selectedEndPort) {
    const tempArrayStartPosition = getPortPosition({
      portPositions,
      port: selectedPort,
      blocksRecord,
    });

    return [relations, tempArrayStartPosition] as const;
  }

  if (selectedEndPort && selectedPort) {
    const relation: Relation = relationFromPorts(selectedPort, selectedEndPort);
    return [relations.concat([relation])] as const;
  }

  return [relations] as const;
}
