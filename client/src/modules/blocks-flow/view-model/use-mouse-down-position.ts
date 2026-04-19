import { create } from "zustand";
import { BlocksFlowDispatch } from "../domain/actions";
import { Position } from "../domain/position";

type Store = {
  mouseDownPosition?: Position;
  setMouseDownPosition: (position?: Position) => void;
  getMouseDownPosition: () => Position | undefined;
};

export const useMouseDownPositionStore = create<Store>((set, get) => ({
  mouseDownPosition: undefined,
  setMouseDownPosition: (position) => set({ mouseDownPosition: position }),
  getMouseDownPosition: () => get().mouseDownPosition,
}));

export function useListenMouseDownPosition(): BlocksFlowDispatch {
  const setPosition = useMouseDownPositionStore(
    (state) => state.setMouseDownPosition
  );
  return (action) => {
    if (action.type === "flowMouseDownAction") {
      setPosition(action.payload.position);
    }
    if (action.type === "rootMouseUpAction") {
      setPosition(undefined);
    }
    if (action.type === "endSelection") {
      setPosition(undefined);
    }
  };
}

export function useGetMouseDownPosition() {
  return useMouseDownPositionStore((store) => store.getMouseDownPosition);
}
