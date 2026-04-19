import { Block } from "../../domain/block";
import { Port, portsAreEqual } from "../../domain/port";
import { useSelectedPortStore } from "./use-selected-port-store";

export function useSelectPort({
  blocks,
  port,
}: {
  port: Port;
  blocks: Block[];
}) {
  const { selectedPort, getIsCanEndSelection, getIsCanStartSelection } =
    useSelectedPortStore();

  const isSelectedPort = selectedPort && portsAreEqual(port, selectedPort);
  const isCanStartSelection = getIsCanStartSelection(port, blocks);
  const isCanEndSelection = selectedPort && getIsCanEndSelection(port, blocks);

  return {
    isSelectedPort,
    isCanStartSelection,
    isCanEndSelection,
  };
}
