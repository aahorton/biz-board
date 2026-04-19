import { BlocksFlowAction, BlocksFlowDispatch } from "../domain/actions";
import { useIsRelationCreating } from "../model/create-relation";

import { createRelationController } from "../view-model/controller/create-relation-controller";
import { idleController } from "../view-model/controller/idle-controller";
import { selectionAreaController } from "../view-model/controller/selection-area-controller";
import { ControllerType } from "../view-model/controller/type";
import { useGetMouseDownPosition } from "../view-model/use-mouse-down-position";

import { useSelectionArea } from "../view-model/use-selection-area";

export function useController(dispatch: BlocksFlowDispatch[]): ControllerType {
  const dispatchAll = (action: BlocksFlowAction) =>
    dispatch.forEach((d) => d(action));

  const isRelationCreating = useIsRelationCreating();
  const selectionArea = useSelectionArea();
  const getMouseDownPosition = useGetMouseDownPosition();

  if (isRelationCreating) {
    return createRelationController(dispatchAll);
  }

  if (selectionArea) {
    return selectionAreaController(dispatchAll);
  }

  return idleController(dispatchAll, () => ({
    mouseDownPosition: getMouseDownPosition(),
  }));
}
