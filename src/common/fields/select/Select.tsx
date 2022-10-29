import Select from "react-select";
import makeAnimated from "react-select/animated";

export const SelectField = ({
  field,
  form,
  options,
  isMulti = false,
  styles,
  onBlur,
}) => {
  const onChange = (option) => {
    form.setFieldValue(
      field.name,
      isMulti ? option.map((item) => item.value) : option.value
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
    <Select
      name={field.name}
      styles={styles}
      value={getValue()}
      onBlur={onBlur}
      onChange={onChange}
      options={options}
      components={animatedComponents}
      isMulti={isMulti}
    />
  );
};
