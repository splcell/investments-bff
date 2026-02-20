import { useState } from "react";
import { Eye } from "../../../assets/icons/Eye";
import { Input } from "../../Input";
import styles from "./PassField.module.scss";

interface PassFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onFocus?: () => void;
}

export const PassField = ({ value, onChange, placeholder, onFocus }: PassFieldProps) => {
  const [isShowPass, setIsShowPass] = useState(false);

  const showPassHandler = () => {
    setIsShowPass((prev) => !prev);
  };

  return (
    <div className={styles.passFieldWrapper}>
      <Input
        type={isShowPass ? "text" : "password"}
        id="password"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
      />
      <button type="button" onClick={showPassHandler}>
        <Eye />
      </button>
    </div>
  );
};
