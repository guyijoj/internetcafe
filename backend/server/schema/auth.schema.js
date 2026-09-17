const { z } = require("zod");
const { ROLES } = require("./roles.schema");

const ALLOWED_ROLES = [...ROLES.ADMIN, ...ROLES.KITCHEN];

const SignUpschema = z.object({
  login: z.email("Неправильный формат email").min(1, "Логин обязателен"),
  password: z.string().min(1, "Пароль обязателен"),
  role: z.enum(ALLOWED_ROLES, "Не допустимый роль"),
});
const Loginschema = z.object({
  login: z.email("Неправильный формат email").min(1, "Логин обязателен"),
  password: z.string().min(1, "Пароль обязателен"),
});
module.exports = {
  Loginschema,
  SignUpschema,
};
