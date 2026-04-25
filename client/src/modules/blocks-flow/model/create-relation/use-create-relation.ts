import { blocksFlowApi } from "../../api";
import { BlocksFlowDispatch } from "../../domain/actions";
import { Block, relationFromPorts } from "../../domain/block";
import { Port } from "../../domain/port";
import { useSelectedPortStore } from "./use-selected-port-store";

export function useCreateRelation({
  blocks,
  onSuccess,
}: {
  blocks: Block[];
  onSuccess?: () => Promise<void>;
}): BlocksFlowDispatch {
  const {
    unselectPorts: unselectPort,
    setSelectedPort,

    getSelectedPort,
    setSelectedEndPort,
    getIsCanEndSelection,
    getIsCanStartSelection,
  } = useSelectedPortStore();

  const startSelection = (port: Port) => {
    if (getIsCanStartSelection(port, blocks)) {
      setSelectedPort(port);
    }
  };

  const createRelation = async (port: Port) => {
    if (getIsCanEndSelection(port, blocks)) {
      setSelectedEndPort(port);

      const params = relationFromPorts(port, getSelectedPort()!);
      await blocksFlowApi.addRelation(params);
      await onSuccess?.();

      unselectPort();
    }
  };

  return (action) => {
    if (action.type === "selectPort") {
      startSelection(action.payload.port);
    }

    if (action.type === "stopCreateRelation") {
      unselectPort();
    }

    if (action.type === "createRelation") {
      createRelation(action.payload.port);
    }
  };
}
