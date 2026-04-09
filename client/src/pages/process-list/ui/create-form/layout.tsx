import styles from "./styles.module.css";

export function Layout({ onSubmit }: { onSubmit: (name: string) => void }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fromData = new FormData(e.currentTarget);
    const name = fromData.get("name") as string;
    onSubmit(name);
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        name="name"
        type="text"
        placeholder="process name"
        required
      />
      <button className={styles.btn}>create</button>
    </form>
  );
}
