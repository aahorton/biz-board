import clsx from "clsx";
import { Position } from "../../domain/position";
import styles from "./styles.module.css";

export function Layout({
  onClick,
  isSelected,
  start,
  end,
  noPointer,
}: {
  start: Position;
  end: Position;
  isSelected?: boolean;
  noPointer?: boolean;
  onClick?: () => void;
}) {
  const d = `M ${start.x} ${start.y} L ${end.x} ${end.y} `;

  return (
    <path
      className={clsx(styles.arrow, {
        [styles.noPointer]: noPointer,
      })}
      d={d}
      fill="none"
      stroke={isSelected ? "blue" : "black"}
      onClick={onClick}
    />
  );
}
