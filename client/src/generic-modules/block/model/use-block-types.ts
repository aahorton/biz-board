import { create } from "zustand";
import {
  BlockTypes,
  BlockTypesRecord,
  getBlockTypesRecord,
} from "../../../generic-modules/block/domain/block-types";
import { blockApi } from "../api";

type Store = {
  blockTypes: BlockTypes[];
  getData: () => BlockTypesRecord;
  isLoading: boolean;
  refetch: () => void;
};

export const useBlockTypes = create<Store>((set, get) => {
  const fetchBlockTypes = () => {
    blockApi.getBlocksTypes().then((blockTypes) => {
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
