import { BlocksFlowDispatch } from "../../domain/actions";
import { ControllerType } from "./type";

export const selectionAreaController = (
  dispatch: BlocksFlowDispatch
): ControllerType => {
  return {
    fieldProps: {},
    rootProps: {
      onMouseMove(e) {
        dispatch({
          type: "rootMouseMoveAction",
          payload: {
            position: {
              x: e.clientX,
              y: e.clientY,
            },
          },
        });
      },

      onMouseUp(e) {
        dispatch({
          type: "endSelection",
          payload: {
            position: {
              x: e.clientX,
              y: e.clientY,
            },
          },
        });
      },
    },
  };
};
