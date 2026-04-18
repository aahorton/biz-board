import { blocksFlowApi } from "../../api";
import { Block, relationFromPorts } from "../../domain/block";
import {
  isPortBlocksSame,
  isPortTypesSame,
  Port,
  portIsAlreadyInUse,
  portsAreEqual,
} from "../../domain/port";
import { useSelectedPortStore } from "./use-selected-port-store";

export function useSelectPort({
  blocks,
  onSuccess,
  port,
}: {
  port: Port;
  blocks: Block[];
  onSuccess?: () => Promise<void>;
}) {
  const {
    unselectPorts: unselectPort,
    setSelectedPort,
    selectedPort,

    setSelectedEndPort,
  } = useSelectedPortStore();

  const isSelectedPort = selectedPort && portsAreEqual(port, selectedPort);

  const isCanStartSelection =
    !selectedPort && !portIsAlreadyInUse(blocks, port);

  const isCanEndSelection =
    selectedPort &&
    !portIsAlreadyInUse(blocks, port) &&
    !isPortTypesSame(port, selectedPort) &&
    !isPortBlocksSame(port, selectedPort);

  const selectPort = async () => {
    if (isCanStartSelection) {
      setSelectedPort(port);
      return;
    }

    if (isCanEndSelection) {
      setSelectedEndPort(port);

      const params = relationFromPorts(port, selectedPort!);
      await blocksFlowApi.addRelation(params);
      await onSuccess?.();

      unselectPort();
    }
  };

  return {
    selectPort,
    isSelectedPort,
    isCanStartSelection,
    isCanEndSelection,
  };
}
