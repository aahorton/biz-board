import { Handle, Position } from "@xyflow/react";
import styles from "./styles.module.css";
import { clsx } from "clsx";

export function Layout({
  text,
  type,
  isCanEndSeletion,
  isSelected,
  id,
}: {
  id: string;
  text: string;
  type: "input" | "output";
  isSelected?: boolean;
  isCanEndSeletion?: boolean;
}) {
  return (
    <div
      className={clsx(styles.port, styles[type], {
        [styles.selected]: isSelected,
        [styles.canEndSelection]: isCanEndSeletion,
      })}
    >
      <div className={styles.text}>{text}</div>

      <Handle
        className={styles.target}
        id={id}
        position={
          {
            input: Position.Left,
            output: Position.Right,
          }[type]
        }
        type={
          {
            input: "target" as const,
            output: "source" as const,
          }[type]
        }
      ></Handle>
    </div>
  );
}
