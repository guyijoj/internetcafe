import styles from "./LoginPage.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LogInInput, Loginschema } from "./types/schema";
import { checkToken, login } from "./api/auth";
import { useNavigate } from "react-router-dom";
import { ROLES } from "./roles";

const LogInPage = () => {
  const {
    register,
    handleSubmit,
    setError,

    formState: { errors, isSubmitting },
  } = useForm<LogInInput>({ resolver: zodResolver(Loginschema) });
  const navigate = useNavigate();

  const onSubmit = async (data: LogInInput) => {
    try {
      const loginResponse = await login(data);
      if (!loginResponse.success) {
        console.error(loginResponse.errors);
        throw new Error();
      }

      const tokenResponse = await checkToken(loginResponse.access_token);
      if (!tokenResponse.success) {
        console.error(tokenResponse.message);
        throw new Error();
      }

      sessionStorage.setItem("access_token", loginResponse.access_token);

      if (ROLES.KITCHEN.includes(tokenResponse.userInfo.role)) {
        navigate("/kitchen", { replace: true });
      } else if (ROLES.ADMIN.includes(tokenResponse.userInfo.role)) {
        navigate("/admin", { replace: true });
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
