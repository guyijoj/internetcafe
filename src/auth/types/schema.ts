import { z } from "zod";

export type LogInInput = {
  login: string;
  password: string;
};
export const Loginschema = z.object({
  login: z.email("Неправильный формат email").min(1, "Логин обязателен"),
  password: z.string().min(1, "Пароль обязателен"),
});

export type UserInfoFromToken = {
  id: number;
  email: string;
  role: string;
};
