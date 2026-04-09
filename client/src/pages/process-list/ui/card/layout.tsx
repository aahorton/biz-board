import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export function Layout({
  id,
  name,
  onDelete,
}: {
  id: string;
  name: string;
  onDelete?: () => void;
}) {
  return (
    <div className={styles.root}>
      <div className={styles.name}>{name}</div>
      <Link className={styles.link} to={`/process/${id}`}></Link>
      <button className={styles.deleteBtn} onClick={onDelete}>
        delete
      </button>
    </div>
  );
}
