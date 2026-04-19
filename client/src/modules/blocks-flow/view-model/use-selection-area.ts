import { create } from "zustand";
import { BlocksFlowDispatch } from "../domain/actions";
import { Position } from "../domain/position";

type Store = {
  startPosition?: Position;
  setStartPosition: (position?: Position) => void;
  getStartPosition: () => Position | undefined;
};

export const useSelectedPortStore = create<Store>((set, get) => ({
  startPosition: undefined,
  setStartPosition: (position) => set({ startPosition: position }),
  getStartPosition: () => get().startPosition,
}));

export function useListenSelectionArea(): BlocksFlowDispatch {
  const setPosition = useSelectedPortStore((state) => state.setStartPosition);
  return (action) => {
    if (action.type === "startSelection") {
      setPosition(action.payload.position);
    }

    if (action.type === "endSelection") {
      setPosition(undefined);
    }
  };
}

export function useSelectionArea() {
  return useSelectedPortStore((store) => store.startPosition);
}
