import { Block } from "../domain/block";
import { PortConfig } from "../domain/block-types";
import { getPortId } from "../domain/port";
import { useSelectPort } from "../model/create-relation";
import { PortView } from "../ui/port";
import { usePortPositionsReader } from "../view-model/use-ports-positions";

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
  onCreateArrow?: () => Promise<void>;
  blocks: Block[];
}) {
  const portInfo = {
    blockId: blockId,
    port: config.port,
    type: type,
  };
  const id = getPortId(portInfo);

  const { selectPort, isSelectedPort, isCanEndSelection } = useSelectPort({
    blocks,
    port: portInfo,
    onSuccess: onCreateArrow,
  });

  const portRef = usePortPositionsReader(id);

  return (
    <PortView
      type={type}
      text={config.label}
      isSelected={isSelectedPort}
      isCanEndSeletion={isCanEndSelection}
      onTargetClick={selectPort}
      portRef={portRef}
    />
  );
}
