import { create } from "zustand";
import { Port } from "../../domain/port";

type Store = {
  selectedPort: Port | undefined;
  selectedEndPort: Port | undefined;
  setSelectedEndPort: (port: Port) => void;
  setSelectedPort: (port: Port) => void;
  unselectPorts: () => void;
};

export const useSelectedPortStore = create<Store>((set) => ({
  selectedPort: undefined,
  selectedEndPort: undefined,
  setSelectedPort: (port: Port) => set({ selectedPort: port }),
  setSelectedEndPort: (port: Port) => set({ selectedEndPort: port }),
  unselectPorts: () =>
    set({ selectedPort: undefined, selectedEndPort: undefined }),
}));
