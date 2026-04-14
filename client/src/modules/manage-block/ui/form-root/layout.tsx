import styles from "./styles.module.css";

export function Layout({
  onSubmit,
  formId,
  children,
}: {
  formId: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  children?: React.ReactNode;
}) {
  return (
    <form className={styles.root} onSubmit={onSubmit} id={formId}>
      {children}
    </form>
  );
}
