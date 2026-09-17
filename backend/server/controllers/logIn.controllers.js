const bcrypt = require("bcrypt");
const pool = require("../db");
const { Loginschema } = require("../schema/auth.schema");
const { generateToken, saveToken } = require("../service/token-service");
const { refreshCookieOptions } = require("../config/cookieConfig");

exports.postAuth = async (req, res) => {
  const validation = Loginschema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      success: false,
      errors: validation.error,
    });
  }
  const { login, password } = validation.data;

  try {
    const existingAdmin = await pool.query(
      `
      select * from staff where email = $1;
    `,
      [login],
    );

    if (existingAdmin.rows.length === 0) throw new Error();
    const user = existingAdmin.rows[0];

    const isPassword = await bcrypt.compare(password, user.password_hash);
    if (!isPassword) {
      throw new Error();
    }
    const { accessToken, refreshToken } = generateToken({
      user_id: user.id,
      user_login: user.email,
      user_role: user.role,
    });
    await saveToken(user.id, refreshToken, pool);

    res.cookie("refresh_token", refreshToken, refreshCookieOptions);

    return res.json({
      success: true,
      access_token: accessToken,
      userInfo: {
        id: user.id,
        user_email: user.email,
        user_role: user.role,
      },
    });
  } catch {
    return res.status(401).json({
      success: false,
      errors: "Неправильное логин и пароль",
    });
  }
};
