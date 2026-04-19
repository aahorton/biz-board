import { Block } from "../domain/block";
import { PortConfig } from "../domain/block-types";
import { getPortId } from "../domain/port";
import { useSelectPort } from "../model/create-relation";
import { PortView } from "../ui/port";
import { ControllerType } from "../view-model/controller/type";
import { usePortPositionsReader } from "../view-model/use-ports-positions";

export function Port({
  config,
  type,
  blockId,
  blocks,
  controller,
}: {
  type: "input" | "output";
  blockId: string;
  config: PortConfig;
  blocks: Block[];
  controller: ControllerType;
}) {
  const portInfo = {
    blockId: blockId,
    port: config.port,
    type: type,
  };
  const id = getPortId(portInfo);

  const { isSelectedPort, isCanEndSelection } = useSelectPort({
    blocks,
    port: portInfo,
  });

  const portRef = usePortPositionsReader(id);

  return (
    <PortView
      type={type}
      text={config.label}
      isSelected={isSelectedPort}
      isCanEndSeletion={isCanEndSelection}
      onTargetClick={controller.portTarget?.(portInfo).onClick}
      portRef={portRef}
    />
  );
}
