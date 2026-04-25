import React from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

export function Layout({
  className,
  onChange,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  value: string;
  onChange: (value: string) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <input
      {...props}
      onChange={handleChange}
      className={clsx(styles.input, className)}
    />
  );
}
