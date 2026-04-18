import { useSelectedPortStore } from "./use-selected-port-store";

export function useUnselectPort() {
  const { selectedPort, unselectPorts: unselectPort } = useSelectedPortStore();

  return {
    unselectPort,
    isSelection: !!selectedPort,
  };
}
