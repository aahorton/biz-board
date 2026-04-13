import styles from "./styles.module.css";
import { clsx } from "clsx";
import { useCallback } from "react";
import { usePortPositions } from "../../view-model/use-ports-positions";

export function Layout({
  id,
  text,
  type,
  isCanEndSeletion,
  isSelected,
  onTargetClick,
}: {
  id: string;
  text: string;
  type: "input" | "output";
  isSelected?: boolean;
  isCanEndSeletion?: boolean;
  onTargetClick?: () => void;
}) {
  const setPortPosition = usePortPositions((state) => state.setPortPosition);

  const callbackRef = useCallback(
    (ref: HTMLButtonElement | null) => {
      if (ref) {
        setPortPosition?.(id, {
          x: ref.offsetLeft + ref.offsetWidth / 2,
          y: ref.offsetTop + ref.offsetHeight / 2,
        });
      } else {
        setPortPosition?.(id);
      }
    },
    [id, setPortPosition]
  );

  return (
    <div
      className={clsx(styles.port, styles[type], {
        [styles.selected]: isSelected,
        [styles.canEndSelection]: isCanEndSeletion,
      })}
    >
      <div className={styles.text}>{text}</div>
      <button
        ref={callbackRef}
        onClick={onTargetClick}
        className={styles.target}
      ></button>
    </div>
  );
}
