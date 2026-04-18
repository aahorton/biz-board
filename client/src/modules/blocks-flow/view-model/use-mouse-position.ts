import { create } from "zustand";
import { useCallback, useRef } from "react";

type Store = {
  position?: { x: number; y: number };
  setPosition: (position: { x: number; y: number }) => void;
};

export const useSelectedPortStore = create<Store>((set) => ({
  position: undefined,
  setPosition: (position) => set({ position }),
}));

export function useListenMousePosition() {
  const unsubscribe = useRef<() => void>();
  const setPosition = useSelectedPortStore((state) => state.setPosition);

  const callbackRef = useCallback((eleemnt: HTMLElement | null) => {
    unsubscribe.current?.();
    if (eleemnt) {
      const listener = (event: MouseEvent) => {
        setPosition({
          x: event.clientX,
          y: event.clientY,
        });
      };

      eleemnt.addEventListener("mousemove", listener);
      unsubscribe.current = () =>
        eleemnt.removeEventListener("mousemove", listener);
    }
  }, []);

  return callbackRef;
}

export function useMousePosition(isEnabled: boolean) {
  return useSelectedPortStore((store) =>
    isEnabled ? store.position : undefined
  );
}
