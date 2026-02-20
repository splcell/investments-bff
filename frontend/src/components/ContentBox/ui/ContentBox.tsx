import type { ReactNode } from "react";
import styles from "./ContenBox.module.scss";
import cn from "classnames";

interface ContentBoxProps {
  title: string;
  children: ReactNode;
  variant?: "border" | "no-border";
  className?: string;
}

export const ContentBox = ({
  title,
  children,
  variant = "border",
  className,
}: ContentBoxProps) => {
  return (
    <div
      className={cn(styles.contentBox, className, {
        [styles.noBorder]: variant === "no-border",
      })}
    >
      {title ? <h3 className={styles.title}>{title}</h3> : null}
      {children}
    </div>
  );
};
