import { Rectangle } from "../../domain/position";
import styles from "./styles.module.css";

export function Layout({ rectangle }: { rectangle: Rectangle }) {
  return (
    <div
      className={styles.selectionArea}
      style={{
        left: rectangle.leftTop.x,
        top: rectangle.leftTop.y,
        width: rectangle.rightBottom.x - rectangle.leftTop.x,
        height: rectangle.rightBottom.y - rectangle.leftTop.y,
      }}
    ></div>
  );
}
