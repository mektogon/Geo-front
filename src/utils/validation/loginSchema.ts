import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  username: Yup.string().required("Required name"),
  password: Yup.string().required("Required password"),
});
