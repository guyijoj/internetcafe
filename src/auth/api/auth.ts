import { LogInInput } from "../types/schema";

export const login = async (data: LogInInput) => {
  const response = await fetch("http://localhost:4000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const result = await response.json();

  return result;
};
export const checkToken = async (accessToken: string) => {
  try {
    const response = await fetch("http://localhost:4000/api/auth/staff-check", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Не удалось проверить авторизацию");
    }

    const result = await response.json();
    return result;
  } catch {
    return {
      success: false,
    };
  }
};

export async function refreshAccessToken(): Promise<string> {
  const response = await fetch("http://localhost:4000/api/auth/refresh", {
    method: "POST",
    credentials: "include",
  });

  const result = await response.json();
  if (!response.ok) {
    sessionStorage.removeItem("access_token");
    throw new Error(result.message ?? "Сессия истекла");
  }
  sessionStorage.setItem("access_token", result.access_token);
  return result.access_token;
}
