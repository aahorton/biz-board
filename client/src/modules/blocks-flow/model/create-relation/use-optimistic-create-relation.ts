import { Relation, relationFromPorts } from "../../domain/block";
import { useSelectedPortStore } from "./use-selected-port-store";

export function useOptimisticCreateRelation(relations: Relation[]) {
  const { selectedPort, selectedEndPort } = useSelectedPortStore();

  if (selectedEndPort && selectedPort) {
    const relation: Relation = relationFromPorts(selectedPort, selectedEndPort);
    return relations.concat([relation]);
  }

  return relations;
}
