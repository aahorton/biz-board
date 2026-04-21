import { BlocksFlowDispatch } from "../../domain/actions";
import { Position, positionDistance } from "../../domain/position";
import { ControllerType } from "./type";

export const idleController = (
  dispatch: BlocksFlowDispatch,
  getState: () => {
    mouseDownPosition?: Position;
  }
): ControllerType => {
  return {
    fieldProps: {
      onMouseDown: (e) => {
        dispatch({
          type: "flowMouseDownAction",
          payload: {
            position: {
              x: e.clientX,
              y: e.clientY,
            },
          },
        });
      },
    },
    rootProps: {
      onKeyDown: (e) => {
        if (e.key === "Backspace" || e.key === "Delete") {
          e.preventDefault();
          dispatch({
            type: "delete",
          });
        }
      },
      onMouseMove: (e) => {
        const { mouseDownPosition } = getState();
        if (
          mouseDownPosition &&
          positionDistance(mouseDownPosition, {
            x: e.clientX,
            y: e.clientY,
          }) > 10
        ) {
          dispatch({
            type: "startSelection",
            payload: { position: mouseDownPosition },
          });
        }
      },
      onMouseUp: (e) => {
        const { mouseDownPosition } = getState();
        dispatch({
          type: "rootMouseUpAction",
          payload: {
            position: {
              x: e.clientX,
              y: e.clientY,
            },
          },
        });

        if (
          mouseDownPosition &&
          positionDistance(mouseDownPosition, {
            x: e.clientX,
            y: e.clientY,
          }) <= 10
        ) {
          dispatch({
            type: "flowClick",
            payload: {
              position: mouseDownPosition,
            },
          });
        }
      },
    },
    portTarget: (port) => {
      return {
        onClick: () => {
          dispatch({
            type: "selectPort",
            payload: {
              port,
            },
          });
        },
      };
    },

    arrow: (relationId) => {
      return {
        onClick: () => {
          dispatch({
            type: "toggleSelectRelation",
            payload: {
              relationId,
            },
          });
        },
      };
    },

    block: (blockId) => {
      return {
        onClick: () => {
          dispatch({
            type: "blockClick",
            payload: {
              blockId,
            },
          });
        },
      };
    },
  };
};
