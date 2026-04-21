import { useLoad } from "../../../shared/use-load";
import { manageBlockApi } from "../api";
import { create } from "zustand";

export type UpdateBlockData = {
  name: string;
  type: string;
  data: string;
  processId: string;
};

type Store = {
  isCreating: boolean;
  updateBlockId: string | undefined;
  startUpdate: (blockId: string) => void;
  cancelUpdate: () => void;
  submitUpdate: (data: UpdateBlockData) => Promise<unknown>;
};

export const useUpdateBlock = create<Store>((set, get) => ({
  isCreating: false,
  updateBlockId: undefined,
  startUpdate: (data) => set({ updateBlockId: data }),
  cancelUpdate: () => set({ updateBlockId: undefined }),
  submitUpdate: async (data) => {
    const blockId = get().updateBlockId;
    if (!blockId) {
      return;
    }

    set({ isCreating: true });

    return manageBlockApi
      .updateBlock({
        ...data,
        blockId: blockId,
      })
      .finally(() => {
        set({ isCreating: false, updateBlockId: undefined });
      });
  },
}));

export function useUpdateBlockData() {
  const updateBlockId = useUpdateBlock((state) => state.updateBlockId);
  return useLoad(
    async () =>
      updateBlockId ? manageBlockApi.getBlockById(updateBlockId) : undefined,
    updateBlockId
  );
}
