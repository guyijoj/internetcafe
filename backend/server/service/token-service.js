const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function generateToken(payload) {
  const accessSecret = process.env.ACCESS_TOKEN_SECRET_KEY;
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET_KEY;

  if (!accessSecret || !refreshSecret) {
    throw new Error("JWT secret keys are not configured");
  }

  const accessToken = jwt.sign(payload, accessSecret, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, refreshSecret, {
    expiresIn: "30d",
  });
  return {
    accessToken,
    refreshToken,
  };
}
async function saveToken(userId, refreshToken, userPool) {
  const expiredAt = new Date();
  expiredAt.setDate(expiredAt.getDate() + 30);

  const hashToken = await bcrypt.hash(refreshToken, 12);

  const token = await userPool.query(
    `
        insert into refresh_token(user_id, token_hash, expires_at)
        values($1, $2, $3)
        on conflict(user_id)
        do update set
        token_hash = excluded.token_hash,
        expires_at = excluded.expires_at
        returning *
        `,
    [userId, hashToken, expiredAt],
  );
  return token;
}

function verifyRefreshToken(refreshToken, options = {}) {
  const secret = process.env.REFRESH_TOKEN_SECRET_KEY;
  if (!secret) {
    throw new Error("Refresh token secret is not configured");
  }
  const payload = jwt.verify(refreshToken, secret, {
    algorithms: ["HS256"],
    ...options,
  });

  if (typeof payload === "string") {
    throw new Error("Invalid token");
  }
  return payload;
}

async function validateStoredToken(userId, refreshToken, pool) {
  const result = await pool.query(
    `
    SELECT token_hash, expires_at
    from refresh_token
    where user_id = $1`,
    [userId],
  );

  if (result.rows.length === 0) return false;
  const storedToken = result.rows[0];
  if (new Date(storedToken.expires_at) <= new Date()) {
    return false;
  }
  return bcrypt.compare(refreshToken, storedToken.token_hash);
}

async function removeToken(userId, pool) {
  try {
    await pool.query(
      `
        delete from refresh_token where user_id = $1
      `,
      [userId],
    );
  } catch (error) {
    console.log("ОШИБКА ВОТ ТУТ: ", error);
    throw new Error("CANNOT REMOVE TOKEN");
  }
}

module.exports = {
  generateToken,
  saveToken,
  verifyRefreshToken,
  validateStoredToken,
  removeToken,
};
