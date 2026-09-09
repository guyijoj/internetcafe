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

module.exports = {
  generateToken,
  saveToken,
};
