import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string
}

export const Input = ({ value, onChange, placeholder, ...props }: InputProps) => {
  return (
    <input
      {...props}
      value={value}
      className={styles.input}
      onChange={onChange}
      placeholder={placeholder || ""}
    />
  );
};
