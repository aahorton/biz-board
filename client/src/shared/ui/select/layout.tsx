import React from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

export type Option = { value: string; label: string };

export function Layout({
  className,
  onChange,
  options,
  value,
  ...props
}: {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange">) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };
  return (
    <select
      {...props}
      className={clsx(styles.input, className)}
      onChange={handleChange}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          selected={option.value === value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}
