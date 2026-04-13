import styles from "./styles.module.css";

export function Layout({
  process,
  isLoading,
  flow,
  modals,
}: {
  process?: {
    name: string;
  };
  isLoading?: boolean;
  flow?: React.ReactNode;
  modals?: React.ReactNode;
}) {
  return (
    <div className={styles.root}>
      {isLoading && <div className={styles.loading}>loading...</div>}
      {flow}
      {modals}
      {process && <h1 className={styles.title}>Process: {process.name}</h1>}
    </div>
  );
}
