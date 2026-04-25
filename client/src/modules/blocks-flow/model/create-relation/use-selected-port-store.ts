import { create } from "zustand";
import {
  isPortBlocksSame,
  isPortTypesSame,
  Port,
  portIsAlreadyInUse,
} from "../../domain/port";
import { Block } from "../../domain/block";

type Store = {
  selectedPort: Port | undefined;
  selectedEndPort: Port | undefined;
  setSelectedEndPort: (port: Port) => void;
  setSelectedPort: (port: Port) => void;
  unselectPorts: () => void;
  getSelectedPort: () => Port | undefined;
  getIsCanEndSelection: (port: Port, blocks: Block[]) => boolean;
  getIsCanStartSelection: (port: Port, blocks: Block[]) => boolean;
};

export const useSelectedPortStore = create<Store>((set, get) => ({
  selectedPort: undefined,
  selectedEndPort: undefined,
  getSelectedPort: () => get().selectedPort,
  setSelectedPort: (port: Port) => set({ selectedPort: port }),
  setSelectedEndPort: (port: Port) => set({ selectedEndPort: port }),
  unselectPorts: () =>
    set({ selectedPort: undefined, selectedEndPort: undefined }),

  getIsCanEndSelection: (port: Port, blocks: Block[]) =>
    !portIsAlreadyInUse(blocks, port) &&
    !isPortTypesSame(port, get().selectedPort) &&
    !isPortBlocksSame(port, get().selectedPort),

  getIsCanStartSelection: (port: Port, blocks: Block[]) =>
    !portIsAlreadyInUse(blocks, port),
}));
