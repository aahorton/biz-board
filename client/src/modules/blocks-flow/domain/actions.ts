import { RelationId } from "./block";
import { Port } from "./port";
import { Position } from "./position";

export type FlowClickAction = {
  type: "flowClick";
  payload: { position: Position };
};

export type DeleteRelations = {
  type: "deleteRelations";
  payload: {
    relations: RelationId[];
  };
};

export type SelectPortAction = {
  type: "selectPort";
  payload: { port: Port };
};

export type SelectRelationAction = {
  type: "selectRelation";
  payload: { relationId: string; value?: boolean };
};

export type StopCreateRelation = {
  type: "stopCreateRelation";
};
export type CreateRelation = {
  type: "createRelation";
  payload: { port: Port };
};

export type BlockClickAction = {
  type: "blockClick";
  payload: { blockId: string };
};

export type BlocksFlowAction =
  | FlowClickAction
  | DeleteRelations
  | SelectPortAction
  | SelectRelationAction
  | StopCreateRelation
  | CreateRelation
  | BlockClickAction;

export type BlocksFlowDispatch = (action: BlocksFlowAction) => void;
