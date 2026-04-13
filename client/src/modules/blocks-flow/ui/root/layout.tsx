import styles from "./styles.module.css";

export function Layout({
  blocks,
  field,
  arrows,
}: {
  blocks: React.ReactNode;
  arrows: React.ReactNode;
  field: React.ReactNode;
}) {
  return (
    <div className={styles.root}>
      {field}
      {blocks}
      {arrows}
    </div>
  );
}
