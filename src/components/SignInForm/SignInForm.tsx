import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button, Input, Spinner } from "@common";
import { useAppDispatch, useAppSelector } from "@utils/hooks";
import { loginSchema } from "@utils/validation";

import { login } from "../../features/auth/authSlice";

import styles from "./SignInForm.module.scss";

export const SignInForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { username, isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.auth
  );

  const onSubmit = (userData: LoginUser) => {
    dispatch(login(userData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      navigate("/");
      toast.success(`Hello `, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [username, isError, isSuccess, navigate, dispatch]);

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.auth}>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ values, handleChange, errors, handleBlur }) => (
          <Form className={styles.sign_in_form}>
            <div className={styles.logo}>
              <div className={styles.cover} />
              <h1 className={styles.title}>Вход в панель администратора</h1>
            </div>

            <Input
              type="text"
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              error={errors.username}
            />

            <Input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={errors.password}
            />

            <Button type="submit" variant="outlined">
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
