import { z } from "zod";
import { UiButton } from "../../../ui/button";
import styles from "./styles.module.css";

export function Layout({ error, resetErrorBoundary }: { error: any; resetErrorBoundary: (...args: any[]) => void }) {
  const zodError = error instanceof z.ZodError ? error : null;
  const message = zodError?.message;

  return (
    <div className={styles.error}>
      Field configuration error
      {message && <div>{message}</div>}
      <UiButton onClick={resetErrorBoundary}>reset</UiButton>
    </div>
  );
}
