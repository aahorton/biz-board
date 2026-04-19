import React from "react";
import styles from "./styles.module.css";

export function Layout({
  elementsLayer,
  relationsLayer,
  rootRef,
  topLayer,
  fieldProps,
  rootProps,
}: {
  elementsLayer: React.ReactNode;
  relationsLayer: React.ReactNode;
  topLayer: React.ReactNode;
  rootProps: React.HTMLAttributes<HTMLDivElement>;
  fieldProps: React.HTMLAttributes<HTMLDivElement>;
  rootRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div tabIndex={0} ref={rootRef} className={styles.root} {...rootProps}>
      <div className={styles.field} {...fieldProps}></div>
      {elementsLayer}
      <svg className={styles.arrows}>{relationsLayer}</svg>
      {topLayer}
    </div>
  );
}
