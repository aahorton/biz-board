import React, { forwardRef } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

export type Option = { value: string; label: string };

export default forwardRef(function Layout(
  {
    className,
    onChangeValue,
    options,
    onChange,
    ...props
  }: {
    onChangeValue?: (value: string) => void;
    options: Option[];
  } & React.SelectHTMLAttributes<HTMLSelectElement>,
  ref: React.ForwardedRef<HTMLSelectElement>
) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e);
    onChangeValue?.(e.target.value);
  };
  return (
    <select
      ref={ref}
      {...props}
      className={clsx(styles.input, className)}
      onChange={handleChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
});
