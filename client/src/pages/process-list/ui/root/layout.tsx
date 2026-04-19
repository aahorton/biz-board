import React from "react";
import styles from "./styles.module.css";

export function Layout({
  actionsPanel,
  list,
  isLoading,
}: {
  actionsPanel: React.ReactNode;
  list: React.ReactNode;
  isLoading?: boolean;
}) {
  return (
    <div className={styles.root}>
      <h1 className={styles.title}>process list</h1>
      {actionsPanel}
      <div className={styles.list}>
        {list}
        {isLoading && <div className={styles.loading}>loading...</div>}
      </div>
    </div>
  );
}
