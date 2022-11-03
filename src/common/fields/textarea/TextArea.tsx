import classnames from "classnames";
import React from "react";

import styles from "./TextArea.module.scss";

interface TextAreaProps extends React.ComponentPropsWithRef<"textarea"> {
  isLoading?: boolean;
  error?: string;
  text?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  id,
  placeholder,
  text,
  error,
  ...props
}) => (
  <label htmlFor={id}>
    <span className={styles.label}>{placeholder}</span>
    <span className={styles.error}>{error}</span>
    <textarea
      className={classnames(styles.input, { [styles.input_error]: !!error })}
      id={id}
      placeholder={text}
      {...props}
    />
  </label>
);
