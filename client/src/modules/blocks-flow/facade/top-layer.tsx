import { createRectangle } from "../domain/position";
import { SelectionArea } from "../ui/selection-area";
import { useMousePosition } from "../view-model/use-mouse-position";
import { useSelectionArea } from "../view-model/use-selection-area";

export function TopLayer() {
  const startPosition = useSelectionArea();
  const mousePosition = useMousePosition(!!startPosition);

  if (startPosition && mousePosition) {
    return (
      <SelectionArea
        rectangle={createRectangle(startPosition, mousePosition)}
      />
    );
  }

  return null;
}
