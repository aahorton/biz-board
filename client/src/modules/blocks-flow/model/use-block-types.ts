import { create } from "zustand";
import { blocksFlowApi } from "../api";
import {
  BlockTypes,
  BlockTypesRecord,
  getBlockTypesRecord,
} from "../domain/block-types";

type Store = {
  blockTypes: BlockTypes[];
  getData: () => BlockTypesRecord;
  isLoading: boolean;
  refetch: () => void;
};

export const useBlockTypes = create<Store>((set, get) => {
  const fetchBlockTypes = () => {
    blocksFlowApi.getBlocksTypes().then((blockTypes) => {
      set({
        blockTypes: blockTypes,
        isLoading: false,
      });
    });
  };

  fetchBlockTypes();

  return {
    blockTypes: [],
    isLoading: true,
    getData: () => getBlockTypesRecord(get().blockTypes),
    refetch: fetchBlockTypes,
  };
});
