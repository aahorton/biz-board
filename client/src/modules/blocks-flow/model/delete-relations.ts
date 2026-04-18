import { blocksFlowApi } from "../api";
import { Relation, RelationId } from "../domain/block";
import { create } from "zustand";

export function useDeleteRelations({
  getRelationsToDelete,
  afterComplete,
  onComplete,
}: {
  getRelationsToDelete: () => RelationId[];
  onComplete: () => Promise<void>;
  afterComplete?: () => void;
}) {
  const setDeletingRelations = useDeleteStore(
    (state) => state.setDeletingRelations
  );

  return async () => {
    setDeletingRelations(getRelationsToDelete());

    await Promise.allSettled(
      getRelationsToDelete().map((id) => blocksFlowApi.deleteRelation(id))
    );

    try {
      afterComplete?.();
      await onComplete();
    } finally {
      setTimeout(() => {
        setDeletingRelations([]);
      });
    }
  };
}

export function useOptimisticDeleteRelations(relations: Relation[]) {
  const deletingRelations = useDeleteStore((state) => state.deletingRelations);

  const filterRelation = (relation: Relation) =>
    !deletingRelations.includes(relation.id);

  return deletingRelations.length > 0
    ? relations.filter(filterRelation)
    : relations;
}

type Store = {
  deletingRelations: RelationId[];
  setDeletingRelations: (deletingRelations: RelationId[]) => void;
};

export const useDeleteStore = create<Store>((set) => ({
  deletingRelations: [],
  setDeletingRelations: (deletingRelations) => set({ deletingRelations }),
}));
