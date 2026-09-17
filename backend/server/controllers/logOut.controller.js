const { cookieOptions } = require("../config/cookieConfig");
const pool = require("../db");
const { verifyRefreshToken, removeToken } = require("../service/token-service");

exports.logOutAuth = async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  let logoutError = null;

  try {
    if (refreshToken) {
      const payload = verifyRefreshToken(refreshToken, {
        ignoreExpiration: true,
      });
      await removeToken(payload.user_id, pool);
    }
  } catch (error) {
    logoutError = error;
    console.error("Failed to invalidate refresh token", error);
  } finally {
    res.clearCookie("refresh_token", cookieOptions);
  }

  if (logoutError) {
    return res.status(500).json({
      success: false,
      message: "Не удалось завершить выход",
    });
  }

  return res.status(204).send();
};
