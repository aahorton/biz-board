import { useSelectedPortStore } from "./use-selected-port-store";

export function useIsRelationCreating() {
  return useSelectedPortStore((state) => state.selectedPort !== undefined);
}
