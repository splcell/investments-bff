import type { ReactNode } from "react";
import styles from "./Button.module.scss";
import cn from "classnames";

interface ButtonProps extends React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> {
  children: ReactNode;
  variant?: "black" | "yellow" | "red";
  className?: string;
}

export const Button = ({
  children,
  variant = "black",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        styles.btn,
        {
          [styles.black]: variant === "black",
          [styles.yellow]: variant === "yellow",
          [styles.red]: variant === "red",
        },
        className,
      )}
    >
      {children}
    </button>
  );
};
