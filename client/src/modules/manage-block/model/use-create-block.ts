import { manageBlockApi } from "../api";
import { BlockPosition } from "./types";
import { create } from "zustand";

export type CreateBlockData = {
  name: string;
  type: string;
  data: string;
  processId: string;
};

type Store = {
  isCreating: boolean;
  createPosition: BlockPosition | null;

  startCreate: (data: BlockPosition) => void;
  cancelCreate: () => void;
  submitCreate: (data: CreateBlockData) => Promise<unknown>;
};

export const useCreateBlock = create<Store>((set, get) => ({
  isCreating: false,
  createPosition: null,
  startCreate: (data) => set({ createPosition: data }),
  cancelCreate: () => set({ createPosition: null }),
  submitCreate: async (data) => {
    const createPosition = get().createPosition;
    if (!createPosition) {
      return;
    }

    set({ isCreating: true });

    return manageBlockApi
      .createBlock({
        ...data,
        ...createPosition,
      })
      .finally(() => {
        set({ isCreating: false, createPosition: null });
      });
  },
}));
