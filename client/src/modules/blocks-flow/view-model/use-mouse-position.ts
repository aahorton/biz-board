import { create } from "zustand";
import { BlocksFlowDispatch } from "../domain/actions";
import { Position } from "../domain/position";

type Store = {
  position?: Position;
  setPosition: (position?: Position) => void;
};

export const useSelectedPortStore = create<Store>((set) => ({
  position: undefined,
  setPosition: (position) => set({ position }),
}));

export function useListenMousePosition(): BlocksFlowDispatch {
  const setPosition = useSelectedPortStore((state) => state.setPosition);
  return (action) => {
    if (action.type === "rootMouseMoveAction") {
      setPosition(action.payload.position);
    }
  };
}

export function useMousePosition(isEnabled: boolean) {
  return useSelectedPortStore((store) =>
    isEnabled ? store.position : undefined
  );
}
