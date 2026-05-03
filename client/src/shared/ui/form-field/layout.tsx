import styles from "./styles.module.css";

export function Layout({ label, children, message }: { label: string; children?: React.ReactNode; message?: string }) {
  return (
    <div className={styles.formField}>
      <label className={styles.label}>{label}</label>
      {children}
      <div className={styles.message}>{message}</div>
    </div>
  );
}
