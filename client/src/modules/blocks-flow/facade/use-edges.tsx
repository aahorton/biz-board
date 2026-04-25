import { Block, blocksRelations } from "../domain/block";

import { useOptimisticCreateRelation } from "../model/create-relation";
import { useOptimisticDeleteRelations } from "../model/delete-relations";
import { relationToEdge } from "../model/flow";
import { useSelected } from "../model/use-selected";

export function useEdges(blocks: Block[]) {
  let relations = blocksRelations(blocks);
  relations = useOptimisticCreateRelation(relations);
  relations = useOptimisticDeleteRelations(relations);

  const selectedRelations = useSelected((state) => state.selectedRelations);

  return relations.map((relation) => {
    return relationToEdge({
      relation,
      selectedRelations,
    });
  });
}
