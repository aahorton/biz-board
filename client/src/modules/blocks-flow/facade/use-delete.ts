import { BlocksFlowDispatch } from "../domain/actions";
import { useDeleteRelations } from "../model/delete-relations";
import { useSelected } from "../model/use-selected";

export function useDelete(onChanged: () => Promise<void>) {
  const resetSelectedRelations = useSelected(
    (state) => state.resetSelectedRelations
  );

  const deleteRelation = useDeleteRelations({
    onComplete: onChanged,
    afterComplete: resetSelectedRelations,
  });

  const listenDeleteActions: BlocksFlowDispatch = (action) => {
    if (action.type === "deleteRelations") {
      deleteRelation(action.payload.relations).catch();
    }
  };

  return listenDeleteActions;
}
