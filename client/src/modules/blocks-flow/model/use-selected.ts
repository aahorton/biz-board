import { create } from "zustand";
import { RelationId } from "../domain/block";
import { BlocksFlowDispatch } from "../domain/actions";
import { Position } from "../domain/position";

type Store = {
  selectedRelations: Record<RelationId, boolean>;
  selectionStart?: Position;
  setRelation: (id: RelationId, value?: boolean) => void;
  getSelectedRelationsArray: () => RelationId[];
  resetSelectedRelations: () => void;
  handleAction: BlocksFlowDispatch;
};

export const useSelected = create<Store>((set, get) => ({
  selectedRelations: {},
  selectionStart: undefined,
  setRelation: (id, value) =>
    set({
      selectedRelations: {
        ...get().selectedRelations,
        [id]: value ?? false,
      },
    }),
  getSelectedRelationsArray: () =>
    Object.keys(get().selectedRelations).filter(
      (id) => get().selectedRelations[id]
    ),
  resetSelectedRelations: () => set({ selectedRelations: {} }),
  handleAction: (action) => {
    if (action.type === "selectRelation") {
      get().setRelation(action.payload.relationId, action.payload.value);
    }
  },
}));
