import { describe, expect, vi, test, beforeAll, afterAll } from "vitest";
import { act, renderHook } from "@testing-library/react";
import {
  useDeleteRelations,
  useOptimisticDeleteRelations,
} from "./delete-relations";
import { testRelation } from "../__test__/stub";
import { blocksFlowApi } from "../api";

describe("blocks-flow/model/delete-relations", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  test("useDeleteRelations", async () => {
    const onComplete = vi.fn().mockReturnValue(Promise.resolve());
    const afterComplete = vi.fn();
    const api = vi
      .spyOn(blocksFlowApi, "deleteRelation")
      .mockRejectedValue(Promise.resolve());

    const { result } = renderHook(() =>
      useDeleteRelations({
        getRelationsToDelete: () => [testRelation.id],
        onComplete: onComplete,
        afterComplete: afterComplete,
      })
    );

    await act(() => {
      return result.current();
    });

    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(afterComplete).toHaveBeenCalledTimes(1);
    expect(api).toHaveBeenCalledWith(testRelation.id);
  });

  test("useOptimisticDelete ", async () => {
    const onComplete = vi.fn().mockReturnValue(Promise.resolve());
    const afterComplete = vi.fn();
    vi.spyOn(blocksFlowApi, "deleteRelation").mockRejectedValue(
      Promise.resolve()
    );

    const { result: useDeleteRelationsResult } = renderHook(() =>
      useDeleteRelations({
        getRelationsToDelete: () => [testRelation.id],
        onComplete: onComplete,
        afterComplete: afterComplete,
      })
    );

    const { result: useOptimisticDeleteRelationsResult, rerender } = renderHook(
      () => useOptimisticDeleteRelations([testRelation])
    );

    act(() => {
      useDeleteRelationsResult.current();
    });

    expect(useOptimisticDeleteRelationsResult.current).toEqual([]);
    vi.runAllTicks();
    await vi.runAllTimersAsync();
    expect(useOptimisticDeleteRelationsResult.current).toEqual([testRelation]);
  });
});
