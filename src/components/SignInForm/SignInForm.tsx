import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { LoginRequest, useLoginMutation } from "@app/services/auth";
import { Button } from "@common/buttons";
import { Input } from "@common/fields";
import { emailSchema, passwordSchema } from "@utils/validation";

import { login, setUser } from "../../features/auth/authSlice";

import styles from "./SignInForm.module.scss";

interface SignInFormValues {
  login: string;
  password: string;
}

export const SignInForm = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit, formState } = useForm<SignInFormValues>({
    mode: "onSubmit",
  });

  const { errors } = formState;

  // TODO: need fix
  const [login, { data, isLoading, error, isError, isSuccess }] =
    useLoginMutation();

  if (isSuccess) {
    dispatch(setUser({ token: data.token, name: data.login }));
    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.login);

    console.log(data, "data");
  }

  return (
    <div className={styles.auth}>
      <form
        className={styles.sign_in_form}
        onSubmit={handleSubmit((values) => login({ ...values }))}
      >
        <div className={styles.logo}>
          <div className={styles.cover} />
          <h1 className={styles.title}>Вход в панель администратора</h1>
        </div>

        <Input
          {...register("login", emailSchema)}
          placeholder="login"
          type="text"
          error={errors.login?.message}
        />
        <Input
          {...register("password", passwordSchema)}
          placeholder="password"
          type="password"
          error={errors.password?.message}
        />
        <Button
          type="submit"
          variant="outlined"
          onClick={async () => {
            try {
              await login(formState).unwrap();
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};
