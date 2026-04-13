import { Block } from "../domain/block";
import { Position as Position } from "../domain/position";
import { useBlockTypes } from "../model/use-block-types";
import { useCreateRelation } from "../model/use-create-relation";
import { Arrows } from "../ui/arrows";
import { BlockView } from "../ui/block";
import { Field } from "../ui/field";
import { Root } from "../ui/root";
import { Port } from "./port";

export function BlocksFlow({
  blocks,
  onFlowClick,
  onChanged,
}: {
  blocks: Block[];
  onFlowClick: (position: Position) => void;
  onChanged?: () => void;
}) {
  const blockTypes = useBlockTypes((state) => state.getData());
  const isSelection = useCreateRelation((state) => state.isSelection());
  const unselectPort = useCreateRelation((state) => state.unselectPort);

  return (
    <Root
      field={<Field onClick={isSelection ? unselectPort : onFlowClick} />}
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
