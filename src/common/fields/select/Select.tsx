import classnames from "classnames";
import { FocusEventHandler } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import styles from "./Select.module.scss";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.ComponentPropsWithRef<"select"> {
  field: any;
  isMulti: boolean;
  form: any;
  placeholder: string;
  options: SelectOption[];
  error: string;
  onBlur?: FocusEventHandler<HTMLSelectElement | HTMLInputElement>;
}

const customStyles = {
  control: (base: any) => ({
    ...base,
    backgroundColor: "rgb(203 213 225)",
  }),
};

export const SelectField: React.FC<SelectProps> = ({
  field,
  form,
  options,
  isMulti = false,
  onBlur,
  placeholder,
  error,
}) => {
  const onChange = (option: any) => {
    form.setFieldValue(
      field.name,
      isMulti ? option.map((item: any) => item.value) : option.value
    );
  };

  const animatedComponents = makeAnimated();

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter((option) => field.value.indexOf(option.value) >= 0)
        : options.find((option) => option.value === field.value);
    }
    return isMulti ? [] : "";
  };

  return (
    <>
      <span className={styles.label}>{placeholder}</span>
      <span className={styles.error}>{error}</span>
      <Select
        name={field.name}
        styles={customStyles}
        className={classnames(styles.select, { [styles.input_error]: !!error })}
        value={getValue()}
        onBlur={onBlur}
        onChange={onChange}
        options={options}
        components={animatedComponents}
        isMulti={isMulti}
      />
    </>
  );
};
