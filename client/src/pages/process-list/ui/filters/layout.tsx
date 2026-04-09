import styles from "./styles.module.css";

export function Layout({
  q,
  onQChange,
}: {
  q: string;
  onQChange: (q: string) => void;
}) {
  return (
    <div className={styles.root}>
      <input
        className={styles.input}
        name="name"
        type="text"
        value={q}
        onChange={(e) => onQChange(e.target.value)}
        placeholder="process name search..."
        required
      />
    </div>
  );
}
