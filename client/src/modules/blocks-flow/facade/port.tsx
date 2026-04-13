import { Block } from "../domain/block";
import { PortConfig } from "../domain/block-types";
import { getPortId } from "../domain/port";
import { useCreateRelation } from "../model/use-create-relation";
import { PortView as PortView } from "../ui/port";

export function Port({
  config,
  type,
  blockId,
  blocks,
  onCreateArrow,
}: {
  type: "input" | "output";
  blockId: string;
  config: PortConfig;
  onCreateArrow?: () => void;
  blocks: Block[];
}) {
  const portInfo = {
    blockId: blockId,
    port: config.port,
    type: type,
  };
  const id = getPortId(portInfo);

  const isSelectedPort = useCreateRelation((state) =>
    state.getIsSelectedPort(portInfo)
  );

  const isCanEndSelection = useCreateRelation((state) =>
    state.getIsCanEndSelection(portInfo, blocks)
  );
  const selectPort = useCreateRelation((state) => state.selectPort);

  return (
    <PortView
      type={type}
      text={config.label}
      id={id}
      isSelected={isSelectedPort}
      isCanEndSeletion={isCanEndSelection}
      onTargetClick={() => selectPort(portInfo, blocks, onCreateArrow)}
    />
  );
}
