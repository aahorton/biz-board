import styles from "./styles.module.css";

export function Layout({ formId }: { formId: string }) {
  return (
    <button className={styles.root} form={formId}>
      Сохранить
    </button>
  );
}
