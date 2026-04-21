import { Block } from "../domain/block";
import { Position as Position } from "../domain/position";
import { useCreateRelation } from "../model/create-relation";

import { useBlockTypes } from "../model/use-block-types";
import { useSelected } from "../model/use-selected";
import { BlockView } from "../ui/block";
import { Root } from "../ui/root";
import { useListenMouseDownPosition } from "../view-model/use-mouse-down-position";

import { useListenMousePosition } from "../view-model/use-mouse-position";
import { usePortPositions } from "../view-model/use-ports-positions";
import { useListenSelectionArea } from "../view-model/use-selection-area";
import { Arrows } from "./arrows";
import { Port } from "./port";
import { TopLayer } from "./top-layer";
import { useController } from "./use-controller";
import { useDelete } from "./use-delete";

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
  const blockTypes = useBlockTypes((state) => state.getData());
  const portPositions = usePortPositions();

  const controller = useController([
    useListenMousePosition(),
    useListenSelectionArea(),
    useListenMouseDownPosition(),
    useDelete(onChanged),
    useCreateRelation({
      blocks,
      onSuccess: onChanged,
    }),
    useSelected((state) => state.handleAction)({
      blocks,
      portPositions,
    }),
    (action) => {
      action.type === "flowClick" && onFlowClick(action.payload.position);
      action.type === "blockClick" && onBlockClick(action.payload.blockId);
    },
  ]);

  return (
    <Root
      fieldProps={controller.fieldProps}
      rootProps={controller.rootProps}
      topLayer={<TopLayer />}
      relationsLayer={<Arrows blocks={blocks} controller={controller} />}
      elementsLayer={blocks.map((block) => (
        <BlockView
          key={block.id}
          block={block}
          blockTypesRecord={blockTypes}
          onClick={controller.block?.(block.id).onClick}
          renderPort={(type, config) => (
            <Port
              controller={controller}
              type={type}
              config={config}
              blockId={block.id}
              blocks={blocks}
            />
          )}
        />
      ))}
    />
  );
}
