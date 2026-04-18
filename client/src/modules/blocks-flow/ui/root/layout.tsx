import { Position } from "../../domain/position";
import styles from "./styles.module.css";

export function Layout({
  blocks,
  arrows,
  onFieldClick,
  rootRef,
}: {
  blocks: React.ReactNode;
  arrows: React.ReactNode;
  onFieldClick: ({ x, y }: Position) => void;
  rootRef?: React.Ref<HTMLDivElement>;
}) {
  const handleFieldClick = (e: React.MouseEvent) => {
    onFieldClick({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div ref={rootRef} className={styles.root}>
      <div className={styles.field} onClick={handleFieldClick}></div>
      {blocks}
      <svg className={styles.arrows}>{arrows}</svg>
    </div>
  );
}
