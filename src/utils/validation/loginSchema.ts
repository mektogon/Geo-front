import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  username: Yup.string().required("Заполните имя!"),
  password: Yup.string().required("Заполните пароль!"),
});
