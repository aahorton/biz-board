import { create } from "zustand";
import { Position } from "../domain/position";

type Store = {
  portPositions: Record<string, Position>;
  setPortPosition: (id: string, postion?: Position) => void;
};

export const usePortPositions = create<Store>((set) => ({
  portPositions: {},
  setPortPosition: (id: string, postion?: Position) => {
    set((state) => {
      if (postion) {
        return { portPositions: { ...state.portPositions, [id]: postion } };
      }
      return state;
    });
  },
}));
