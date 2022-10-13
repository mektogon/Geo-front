import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@common/buttons";
import { Input } from "@common/fields";
import { emailSchema, passwordSchema } from "@utils/validation";

import styles from "./SignInForm.module.scss";

interface SignInFormValues {
  email: string;
  password: string;
}

export const SignInForm = () => {
  const { register, handleSubmit, formState } = useForm<SignInFormValues>({
    mode: "onSubmit",
  });

  const { isSubmitting, errors } = formState;

  return (
    <div className={styles.auth}>
      <div className={styles.cover} />
      <h1 className={styles.title}>Вход в панель администратора</h1>

      <form
        className={styles.sign_in_form}
        onSubmit={handleSubmit(async ({ password, email }) => {
          console.log(password, email);
        })}
      >
        <Input
          {...register("email", emailSchema)}
          placeholder="email"
          type="text"
          error={errors.email?.message}
        />
        <Input
          {...register("password", passwordSchema)}
          placeholder="password"
          type="password"
          error={errors.email?.message}
        />
        <Button type="submit" variant="outlined">
          Sign In
        </Button>
      </form>
    </div>
  );
};
