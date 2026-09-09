const jwt = require("jsonwebtoken");

function authMiddleWare(req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(400).json({
      success: false,
      code: "AUTHORIZATION REQUIRED",
      message: "Authorization is required",
    });
  }

  const [scheme, access_token] = authorization.trim().split(/\s+/);

  if (scheme !== "Bearer" || !access_token) {
    return res.status(401).json({
      success: false,
      code: "INVALID_AUTHORIZATIO_FORMAT",
      message: "Invalid header's format",
    });
  }

  const accessSecret = process.env.ACCESS_TOKEN_SECRET_KEY;
  if (!accessSecret) {
    return res.status(500).json({
      success: false,
      code: "SERVER_CONFIGURATION_ERROR",
      message: "Server configuration error",
    });
  }

  try {
    const payload = jwt.verify(access_token, accessSecret, {
      algorithms: ["HS256"],
    });

    if (
      typeof payload === "string" ||
      !Number.isInteger(payload.user_id) ||
      typeof payload.user_role !== "string"
    ) {
      return res.status(401).json({
        success: false,
        code: "INVALID_ACCESS_TOKEN",
        message: "Некорректный access-токен",
      });
    }

    req.user = {
      user_id: payload.user_id,
      email: payload.user_login,
      role: payload.user_role,
    };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        code: "ACCESS_TOKEN_EXPIRED",
        message: "ACCESS TOKENEXPIRED",
      });
    }
    return res.status(401).json({
      success: false,
      code: "INVALID_ACCESS_TOKEN",
      message: "Access-токен недействителен",
    });
  }
}

module.exports = {
  authMiddleWare,
};
// Проверяет наличие заголовка.
// Извлекает токен.
// Проверяет подпись и срок действия.
// Читает user_id, user_login и user_role.
// Записывает пользователя в req.user.
// Разрешает выполнение контроллера через next().
