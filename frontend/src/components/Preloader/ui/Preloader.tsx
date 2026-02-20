import styles from "./Preloader.module.scss";
import cn from "classnames";

interface PreloaderProps {
  variant: "black" | "white";
  className?: string;
}

export const Preloader = ({ variant, className }: PreloaderProps) => {
  return (
    <span
      className={cn(
        styles.loader,
        {
          [styles.black]: variant === "black",
          [styles.white]: variant === "white",
        },
        className,
      )}
    ></span>
  );
};
