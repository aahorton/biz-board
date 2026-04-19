import { Port } from "./port";
import { Position } from "./position";

export type FlowClickAction = {
  type: "flowClick";
  payload: { position: Position };
};
export type FlowMouseDownAction = {
  type: "flowMouseDownAction";
  payload: { position: Position };
};
export type RootMouseUpAction = {
  type: "rootMouseUpAction";
  payload: { position: Position };
};
export type RootMouseMoveAction = {
  type: "rootMouseMoveAction";
  payload: { position: Position };
};

export type DeleteAction = {
  type: "delete";
};

export type SelectPortAction = {
  type: "selectPort";
  payload: { port: Port };
};

export type SelectRelationAction = {
  type: "toggleSelectRelation";
  payload: { relationId: string };
};

export type StopCreateRelation = {
  type: "stopCreateRelation";
};
export type CreateRelation = {
  type: "createRelation";
  payload: { port: Port };
};

export type StartSelection = {
  type: "startSelection";
  payload: { position: Position };
};

export type EndSelection = {
  type: "endSelection";
  payload: { position: Position };
};

export type BlocksFlowAction =
  | FlowClickAction
  | DeleteAction
  | SelectPortAction
  | SelectRelationAction
  | StopCreateRelation
  | CreateRelation
  | RootMouseUpAction
  | FlowMouseDownAction
  | StartSelection
  | EndSelection
  | RootMouseMoveAction;

export type BlocksFlowDispatch = (action: BlocksFlowAction) => void;
