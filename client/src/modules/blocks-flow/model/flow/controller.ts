import { ReactFlowProps } from "@xyflow/react";
import { BlocksFlowAction, BlocksFlowDispatch } from "../../domain/actions";
import { AppEdge, AppNode } from "./types";

export const flowController = (
  dispatchList: BlocksFlowDispatch[]
): ReactFlowProps<AppNode, AppEdge> => {
  const dispatch = (action: BlocksFlowAction) =>
    dispatchList.forEach((d) => d(action));
  return {
    onEdgesChange: (changes) => {
      for (const change of changes) {
        if (change.type === "select") {
          dispatch({
            type: "selectRelation",
            payload: {
              relationId: change.id,
              value: change.selected,
            },
          });
        }
      }
    },
    onConnectStart: (e, { handleId, handleType, nodeId }) => {
      dispatch({
        type: "selectPort",
        payload: {
          port: {
            blockId: nodeId!,
            port: handleId!,
            type: handleType === "source" ? "output" : "input",
          },
        },
      });
    },
    onConnectEnd: (e, res) => {
      if (res.isValid) {
        dispatch({
          type: "createRelation",
          payload: {
            port: {
              blockId: res.toNode?.id!,
              port: res.toHandle?.id!,
              type: res.toHandle?.type === "source" ? "output" : "input",
            },
          },
        });
      } else {
        dispatch({
          type: "stopCreateRelation",
        });
      }
    },
    onNodeClick: (e, node) => {
      dispatch({
        type: "blockClick",
        payload: {
          blockId: node.id,
        },
      });
    },

    onPaneClick: (e) => {
      dispatch({
        type: "flowClick",
        payload: {
          position: {
            x: e.clientX,
            y: e.clientY,
          },
        },
      });
    },
    onEdgesDelete: (edges) => {
      dispatch({
        type: "deleteRelations",
        payload: {
          relations: edges.map((edge) => edge.id),
        },
      });
    },
  };
};
