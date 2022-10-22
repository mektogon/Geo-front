import classnames from "classnames";
import React from "react";

import styles from "./Input.module.scss";

interface InputProps extends React.ComponentPropsWithRef<"input"> {
  isLoading?: boolean;
  error?: string;
  text?: string;
}

export const Input: React.FC<InputProps> = React.forwardRef(
  ({ id, placeholder, text, error, ...props }, inputRef) => (
    <label htmlFor={id}>
      <span className={styles.label}>{placeholder}</span>
      <input
        className={classnames(styles.input, { [styles.input_error]: !!error })}
        ref={inputRef}
        id={id}
        placeholder={text}
        {...props}
      />
      <span className={styles.error}>{error}</span>
    </label>
  )
);
