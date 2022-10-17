import * as Yup from "yup";

export const ValidationSchema = Yup.object().shape({
  username: Yup.string().required("Required name"),
  password: Yup.string().required("Required password"),
});
