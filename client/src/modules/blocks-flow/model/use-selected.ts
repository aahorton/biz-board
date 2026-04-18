import { create } from "zustand";
import { RelationId } from "../domain/block";

type Store = {
  selectedRelations: Record<RelationId, boolean>;
  tooggleRelation: (id: RelationId) => void;
  getSelectedRelationsArray: () => RelationId[];
  resetSelectedRelations: () => void;
};

export const useSelected = create<Store>((set, get) => ({
  selectedRelations: {},
  tooggleRelation: (id) =>
    set({
      selectedRelations: {
        ...get().selectedRelations,
        [id]: !get().selectedRelations[id],
      },
    }),
  getSelectedRelationsArray: () =>
    Object.keys(get().selectedRelations).filter(
      (id) => get().selectedRelations[id]
    ),
  resetSelectedRelations: () => set({ selectedRelations: {} }),
}));
