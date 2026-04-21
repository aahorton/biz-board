import { describe, expect, test } from "vitest";
import { getRelationsPositions } from "./block";
import { testBlock1, testBlock2, testRelation } from "../__test__/stub";
import { getPortId } from "./port";

describe("blocks-flow/domain/block", () => {
  test("getRelationPositions", () => {
    const result = getRelationsPositions({
      blocksRecord: {
        [testBlock1.id]: testBlock1,
        [testBlock2.id]: testBlock2,
      },
      portPositions: {
        [getPortId({
          blockId: testBlock1.id,
          port: testRelation.outputPort,
          type: "output",
        })]: { x: 0, y: 0 },
        [getPortId({
          blockId: testBlock2.id,
          port: testRelation.inputPort,
          type: "input",
        })]: { x: 10, y: 10 },
      },
      relations: [testRelation],
    });

    expect(result).toEqual([
      {
        id: testRelation.id,
        outputPosition: { x: 0, y: 0 },
        inputPosition: { x: 10, y: 10 },
      },
    ]);
  });
});
