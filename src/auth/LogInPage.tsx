import React from "react";
import styles from "./LoginPage.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogInInput, Loginschema } from "./types/schema";
import { login } from "./api/auth";

const LogInPage = () => {
  const {
    register,
    handleSubmit,
    setError,

    formState: { errors, isSubmitting },
  } = useForm<LogInInput>({ resolver: zodResolver(Loginschema) });

  const onSubmit = async (data: LogInInput) => {
    try {
      const loginResponse = await login(data);
      if (!loginResponse.success) {
        setError("root.serverError", {
          message: loginResponse.errors,
        });
        return;
      }

      const tokenResponse = await fetch(
        "http://localhost:4000/api/auth/admin-check",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${loginResponse.access_token}`,
          },
          credentials: "include",
        },
      );

      const result = await tokenResponse.json();
      console.log(result);
      if (!tokenResponse.ok) {
        setError("root.serverError", {
          message: result.message ?? "Не удалось проверить авторизацию",
        });

        return;
      }
    } catch {
      setError("root.serverError", {
        message: "Ошибка сервера",
      });
    }
  };
  return (
    <div className={styles.main}>
      <form className={styles.logInForm} onSubmit={handleSubmit(onSubmit)}>
        <h2>Вход</h2>

        <input
          type="text"
          {...register("login", { required: true })}
          placeholder="Логин"
          className={`${styles.input} ${errors.login ? styles.inputError : ""}`}
        />
        {errors.login && (
          <span className={styles.requiredError}>{errors.login.message}</span>
        )}

        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Пароль"
          className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
        />
        {errors.password && (
          <span className={styles.requiredError}>
            {errors.password?.message}
          </span>
        )}

        <button
          type="submit"
          className={`${styles.submitButton} ${isSubmitting ? styles.isSubmittingButton : styles.toSubmitButton}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading" : "Submit"}
        </button>
        {errors.root?.serverError.message && (
          <span className={styles.requiredError}>
            {errors.root?.serverError.message}
          </span>
        )}
      </form>
    </div>
  );
};

export default LogInPage;
