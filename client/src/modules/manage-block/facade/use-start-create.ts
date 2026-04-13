import { useCreateBlock } from "../model/use-create-block";

export function useStartCreate() {
  return useCreateBlock((state) => state.startCreate);
}
