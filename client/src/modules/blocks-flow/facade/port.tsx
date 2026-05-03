import { Block } from "../domain/block";
import { PortConfig } from "../../../generic-modules/block";

import { useSelectPort } from "../model/create-relation";
import { PortView } from "../ui/port";

export function Port({
  config,
  type,
  blockId,
  blocks,
}: {
  type: "input" | "output";
  blockId: string;
  config: PortConfig;
  blocks: Block[];
}) {
  const portInfo = {
    blockId: blockId,
    port: config.port,
    type: type,
  };

  const { isSelectedPort, isCanEndSelection } = useSelectPort({
    blocks,
    port: portInfo,
  });

  return (
    <PortView
      id={config.port}
      type={type}
      text={config.label}
      isSelected={isSelectedPort}
      isCanEndSeletion={isCanEndSelection}
    />
  );
}
