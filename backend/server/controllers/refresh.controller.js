const {
  verifyRefreshToken,
  validateStoredToken,
  generateToken,
  saveToken,
} = require("../service/token-service");
const pool = require("../db");
const {
  refreshCookieOptions,
  cookieOptions,
} = require("../config/cookieConfig");

exports.refresh = async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "Refresh-token is missing",
    });
  }
  try {
    const payload = verifyRefreshToken(refreshToken);

    const isStored = await validateStoredToken(
      payload.user_id,
      refreshToken,
      pool,
    );
    if (!isStored) {
      throw new Error("Refresh token not found");
    }

    const result = await pool.query(
      `
        SELECT id, email, role
        FROM staff
        WHERE id = $1
        `,
      [payload.user_id],
    );
    if (result.rows.length === 0) {
      throw new Error("User not found");
    }
    const user = result.rows[0];

    const tokens = generateToken({
      user_id: user.id,
      user_login: user.email,
      user_role: user.role,
    });
    await saveToken(user.id, tokens.refreshToken, pool);
    res.cookie("refresh_token", tokens.refreshToken, refreshCookieOptions);
    return res.json({
      success: true,
      access_token: tokens.accessToken,
      userId: {
        id: user.id,
        user_email: user.email,
        user_role: user.role,
      },
    });
  } catch {
    res.clearCookie("refresh_token", cookieOptions);
    return res.status(401).json({
      success: false,
      errors: "Сессия истеклась",
    });
  }
};
