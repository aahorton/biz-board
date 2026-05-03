import React from "react";
import styles from "./styles.module.css";

export function Layout({ children }: { children?: React.ReactNode }) {
  return <div className={styles.root}>{children}</div>;
}
