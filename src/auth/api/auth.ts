import { LogInInput } from "../types/schema";

export const login = async (data: LogInInput) => {
  const response = await fetch("http://localhost:4000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();

  return result;
};
