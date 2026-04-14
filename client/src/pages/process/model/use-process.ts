import { useLoad } from "../../../shared/use-load";
import { processApi } from "../api";

export function useProcess(id: string) {
  return useLoad(() => processApi.getById(id));
}
