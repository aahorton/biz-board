import { BlocksFlowDispatch } from "../../domain/actions";
import { ControllerType } from "./type";

export const createRelationController = (
  dispatch: BlocksFlowDispatch
): ControllerType => {
  return {
    fieldProps: {
      onClick: () => {
        dispatch({
          type: "stopCreateRelation",
        });
      },
    },
    rootProps: {
      onMouseMove: (e) => {
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
      onKeyDown: (e) => {
        if (e.key === "Backspace" || e.key === "Delete") {
          e.preventDefault();
          dispatch({
            type: "stopCreateRelation",
          });
        }
      },
    },
    portTarget: (port) => {
      return {
        onClick: () => {
          dispatch({
            type: "createRelation",
            payload: {
              port,
            },
          });
        },
      };
    },
  };
};
