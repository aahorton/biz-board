import React, { forwardRef } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

export default forwardRef(function Layout(
  {
    className,
    onChangeValue,
    onChange,
    ...props
  }: React.InputHTMLAttributes<HTMLInputElement> & {
    value?: string;
    onChangeValue?: (value: string) => void;
  },
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeValue?.(e.target.value);
    onChange?.(e);
  };
  return (
    <input
      ref={ref}
      {...props}
      onChange={handleChange}
      className={clsx(styles.input, className)}
    />
  );
});
