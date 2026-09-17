import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogOutButton = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogOut = async () => {
    setErrorMessage(null);
    setIsLoggingOut(true);

    try {
      const response = await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.message ?? "Не удалось выйти. Попробуйте ещё раз.");
      }

      sessionStorage.removeItem("access_token");
      navigate("/login", { replace: true });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Не удалось выйти. Попробуйте ещё раз.";

      setErrorMessage(message);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <button type="button" onClick={handleLogOut} disabled={isLoggingOut}>
        {isLoggingOut ? "Выход..." : "Выйти"}
      </button>
      {errorMessage && <p role="alert">{errorMessage}</p>}
    </>
  );
};

export default LogOutButton;
