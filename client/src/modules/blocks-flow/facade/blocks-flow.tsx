import { Block } from "../domain/block";
import { Position as Position } from "../domain/position";
import { useUnselectPort } from "../model/create-relation";
import { useBlockTypes } from "../model/use-block-types";
import { BlockView } from "../ui/block";
import { Root } from "../ui/root";
import { useListenMousePosition } from "../view-model/use-mouse-position";
import { Arrows } from "./arrows";
import { Port } from "./port";
import { useDelete } from "./use-delete";

export function BlocksFlow({
  blocks,
  onFlowClick,
  onChanged,
}: {
  blocks: Block[];
  onFlowClick: (position: Position) => void;
  onChanged: () => Promise<void>;
}) {
  const blockTypes = useBlockTypes((state) => state.getData());
  const unselectPort = useUnselectPort();
  const rootRef = useListenMousePosition();

  useDelete(onChanged);

  return (
    <Root
      rootRef={rootRef}
      onFieldClick={
        unselectPort.isSelection ? unselectPort.unselectPort : onFlowClick
      }
      arrows={<Arrows blocks={blocks} />}
      blocks={blocks.map((block) => (
        <BlockView
          key={block.id}
          block={block}
          blockTypesRecord={blockTypes}
          renderPort={(type, config) => (
            <Port
              type={type}
              config={config}
              blockId={block.id}
              blocks={blocks}
              onCreateArrow={onChanged}
            />
          )}
        />
      ))}
    />
  );
}
