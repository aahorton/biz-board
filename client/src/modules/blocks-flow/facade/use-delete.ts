import { useDeleteRelations } from "../model/delete-relations";
import { useSelected } from "../model/use-selected";
import { useKeysHandlers } from "../view-model/use-keys-handler";

export function useDelete(onChanged: () => Promise<void>) {
  const getSelectedRelations = useSelected(
    (state) => state.getSelectedRelationsArray
  );
  const resetSelectedRelations = useSelected(
    (state) => state.resetSelectedRelations
  );

  const deleteRelation = useDeleteRelations({
    getRelationsToDelete: getSelectedRelations,
    onComplete: onChanged,
    afterComplete: resetSelectedRelations,
  });

  useKeysHandlers({
    onDelete: deleteRelation,
  });
}
