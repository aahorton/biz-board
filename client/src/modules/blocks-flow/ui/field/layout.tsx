import { Position } from "../../domain/position";
import styles from "./styles.module.css";

export function Layout({ onClick }: { onClick: ({ x, y }: Position) => void }) {
  const handleClick = (e: React.MouseEvent) => {
    onClick({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return <div className={styles.field} onClick={handleClick}></div>;
}
