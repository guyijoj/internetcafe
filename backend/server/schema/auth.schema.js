const { z } = require("zod");
const Loginschema = z.object({
  login: z.email("Неправильный формат email").min(1, "Логин обязателен"),
  password: z.string().min(1, "Пароль обязателен"),
});

module.exports = {
  Loginschema,
};
