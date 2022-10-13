export const passwordSchema = {
  required: { value: true, message: "Field is Required " },
  minLength: { value: 2, message: "min length is 2" },
  maxLength: { value: 15, message: "max length is 15" },
};
