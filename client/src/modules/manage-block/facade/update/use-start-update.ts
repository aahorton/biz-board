import { useUpdateBlock } from "../../model/update-block";

export function useStartUpdate() {
  return useUpdateBlock((state) => state.startUpdate);
}
