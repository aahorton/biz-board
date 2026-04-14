import styles from "./styles.module.css";
import { clsx } from "clsx";
import { Ref } from "react";

export function Layout({
  text,
  type,
  isCanEndSeletion,
  isSelected,
  onTargetClick,
  portRef,
}: {
  text: string;
  type: "input" | "output";
  isSelected?: boolean;
  isCanEndSeletion?: boolean;
  onTargetClick?: () => void;
  portRef: Ref<HTMLButtonElement>;
}) {
  return (
    <div
      className={clsx(styles.port, styles[type], {
        [styles.selected]: isSelected,
        [styles.canEndSelection]: isCanEndSeletion,
      })}
    >
      <div className={styles.text}>{text}</div>
      <button
        ref={portRef}
        onClick={onTargetClick}
        className={styles.target}
      ></button>
    </div>
  );
}
