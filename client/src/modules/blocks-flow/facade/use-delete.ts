import { BlocksFlowDispatch } from "../domain/actions";
import { useDeleteRelations } from "../model/delete-relations";
import { useSelected } from "../model/use-selected";

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

  const listenDeleteActions: BlocksFlowDispatch = (action) => {
    if (action.type === "delete") {
      deleteRelation();
    }
  };

  return listenDeleteActions;
}
