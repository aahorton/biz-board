import { create } from "zustand";
import {
  Block,
  blocksRelations,
  getBlocksRecord,
  getRelationsPositions,
  RelationId,
} from "../domain/block";
import { BlocksFlowDispatch } from "../domain/actions";
import {
  createRectangle,
  Position,
  positionInRectangle,
} from "../domain/position";
import { PortId } from "../domain/port";

type Store = {
  selectedRelations: Record<RelationId, boolean>;
  selectionStart?: Position;
  tooggleRelation: (id: RelationId) => void;
  getSelectedRelationsArray: () => RelationId[];
  resetSelectedRelations: () => void;
  handleAction: (params: {
    blocks: Block[];
    portPositions: Record<PortId, Position>;
  }) => BlocksFlowDispatch;
};

export const useSelected = create<Store>((set, get) => ({
  selectedRelations: {},
  selectionStart: undefined,
  tooggleRelation: (id) =>
    set({
      selectedRelations: {
        ...get().selectedRelations,
        [id]: !get().selectedRelations[id],
      },
    }),
  getSelectedRelationsArray: () =>
    Object.keys(get().selectedRelations).filter(
      (id) => get().selectedRelations[id]
    ),
  resetSelectedRelations: () => set({ selectedRelations: {} }),
  handleAction:
    ({ blocks, portPositions }) =>
    (action) => {
      if (action.type === "toggleSelectRelation") {
        get().tooggleRelation(action.payload.relationId);
      }

      if (action.type === "startSelection") {
        set({
          selectionStart: action.payload.position,
        });
      }

      if (action.type === "endSelection") {
        const startSelection = get().selectionStart;
        if (!startSelection) {
          return;
        }
        const endSelection = action.payload.position;
        const selectionRectangle = createRectangle(
          startSelection,
          endSelection
        );

        const blocksRecord = getBlocksRecord(blocks);
        const relations = blocksRelations(blocks);
        const relationsPositions = getRelationsPositions({
          relations: relations,
          blocksRecord: blocksRecord,
          portPositions,
        });

        const relationsToSelect = relationsPositions.filter(
          (relationPosition) =>
            positionInRectangle(
              relationPosition.inputPosition,
              selectionRectangle
            ) &&
            positionInRectangle(
              relationPosition.outputPosition,
              selectionRectangle
            )
        );

        set({
          selectedRelations: Object.fromEntries(
            relationsToSelect.map((relation) => [relation.id, true])
          ),
          selectionStart: undefined,
        });
      }
    },
}));
