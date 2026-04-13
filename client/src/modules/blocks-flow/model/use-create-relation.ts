import { create } from "zustand";
import { blocksFlowApi } from "../api";
import { Block } from "../domain/block";
import {
  isPortTypesSame,
  Port,
  portIsAlreadyInUse,
  portsAreEqual,
} from "../domain/port";

type Store = {
  selectedPort: Port | undefined;
  setSelectedPort: (port: Port) => void;
  isSelection: () => boolean;
  getIsSelectedPort: (port: Port) => boolean;
  getIsCanStartSelection: (port: Port, blocks: Block[]) => boolean;
  getIsCanEndSelection: (port: Port, blocks: Block[]) => boolean;
  selectPort: (port: Port, blocks: Block[], onSuccess?: () => void) => void;
  unselectPort: () => void;
};

export const useCreateRelation = create<Store>((set, get) => ({
  selectedPort: undefined,
  setSelectedPort: (port: Port) => set({ selectedPort: port }),

  isSelection: () => !!get().selectedPort,

  getIsSelectedPort: (port: Port) =>
    !!get().selectedPort && portsAreEqual(port, get().selectedPort),

  getIsCanStartSelection: (port: Port, blocks: Block[]) =>
    !get().selectedPort && !portIsAlreadyInUse(blocks, port),

  getIsCanEndSelection: (port: Port, blocks: Block[]) =>
    !!get().selectedPort &&
    !portIsAlreadyInUse(blocks, port) &&
    !isPortTypesSame(port, get().selectedPort),

  selectPort: (port, blocks, onSuccess) => {
    if (get().getIsCanStartSelection(port, blocks)) {
      set({ selectedPort: port });
      return;
    }

    if (get().getIsCanEndSelection(port, blocks)) {
      const selectedPort = get().selectedPort;
      const params =
        port.type === "input"
          ? {
              inputId: port.blockId,
              inputPort: port.port,
              outputId: selectedPort!.blockId,
              outputPort: selectedPort!.port,
            }
          : {
              inputId: selectedPort!.blockId,
              inputPort: selectedPort!.port,
              outputId: port.blockId,
              outputPort: port.port,
            };

      return blocksFlowApi.addRelation(params).then(() => {
        get().unselectPort();
        onSuccess?.();
      });
    }
  },

  unselectPort: () => set({ selectedPort: undefined }),
}));
