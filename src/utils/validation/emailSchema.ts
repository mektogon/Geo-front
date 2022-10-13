export const emailSchema = {
  required: { value: true, message: "Field is Required " },
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "invalid email address",
  },
};
