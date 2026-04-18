import {
  Block,
  getBlocksRecord,
  blocksRelations,
  getRelationsPositions,
} from "../domain/block";
import { useOptimisticCreateRelation } from "../model/create-relation";
import { useOptimisticDeleteRelations } from "../model/delete-relations";
import { useSelected } from "../model/use-selected";
import { ArrowUi } from "../ui/arrow";
import { useMousePosition } from "../view-model/use-mouse-position";
import { usePortPositions } from "../view-model/use-ports-positions";

export function Arrows({ blocks }: { blocks: Block[] }) {
  const portPositions = usePortPositions();
  const blocksRecord = getBlocksRecord(blocks);

  const selected = useSelected((state) => state.selectedRelations);
  const toggleRelation = useSelected((state) => state.tooggleRelation);

  const relations = blocksRelations(blocks);

  const optimisticDeleteRelations = useOptimisticDeleteRelations(relations);
  const [optimisticCreateRelations, tempArrayStartPosition] =
    useOptimisticCreateRelation({
      relations: optimisticDeleteRelations,
      blocksRecord,
      portPositions,
    });

  const arrows = getRelationsPositions({
    relations: optimisticCreateRelations,
    blocksRecord: blocksRecord,
    portPositions,
  });

  const mousePosition = useMousePosition(!!tempArrayStartPosition);

  return (
    <>
      {tempArrayStartPosition && mousePosition && (
        <ArrowUi start={tempArrayStartPosition} end={mousePosition} noPointer />
      )}
      {arrows.map(({ id, outputPosition, inputPosition }) => (
        <ArrowUi
          key={id}
          start={outputPosition}
          end={inputPosition}
          onClick={() => toggleRelation(id)}
          isSelected={selected[id]}
        />
      ))}
    </>
  );
}
