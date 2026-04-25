import React from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

export function Layout({
  className,
  variant = "primary",
  ...props
}: {
  variant?: "primary" | "danger";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={clsx(styles.button, className, styles[variant])}
    />
  );
}
