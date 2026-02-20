import type { DetailedHTMLProps, ReactNode } from "react";
import styles from "./Form.module.scss";
import { Error } from "../../Error";

interface FormProps extends DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> {
  children: ReactNode;
  title?: string;
  error?: string | null
}

export const Form = ({ children, title, error, ...props }: FormProps) => {
  return (
    <form {...props} className={styles.form}>
      {title && <h3>{title}</h3>}
      {children}
      {error && <Error>{error}</Error>}
    </form>
  );
};
