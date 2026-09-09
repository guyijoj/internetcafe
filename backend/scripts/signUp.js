const pool = require("../server/db");
const bcrypt = require("bcrypt");
const { Loginschema } = require("../server/schema/auth.schema");
const { generateToken, saveToken } = require("../server/service/token-service");

async function signUp(logForm, passForm) {
  const validation = Loginschema.safeParse({
    login: logForm,
    password: passForm,
  });
  if (!validation.success) {
    console.log("Validation error");
    return;
  }
  const hashPassword = await bcrypt.hash(passForm, 12);

  const newAdmin = await pool.connect();
  try {
    await newAdmin.query("BEGIN");

    const existingAdmin = await newAdmin.query(
      `
              insert into admins(email, password_hash, role)
              values($1, $2, 'admin_primary')
              returning id, email, password_hash, role
          `,
      [logForm, hashPassword],
    );

    const { id, email, password_hash, role } = existingAdmin.rows[0];

    const tokens = generateToken({
      user_id: id,
      user_login: email,
      user_role: role,
    });
    await saveToken(id, tokens.refreshToken, newAdmin);
    await newAdmin.query("COMMIT");
    console.log(tokens.accessToken);
    console.log(email, password_hash);
    console.log("SUCCESS");
  } catch (e) {
    await newAdmin.query("ROLLBACK");
    console.log("ОШИБКА");
    console.log(e);
  } finally {
    newAdmin.release();
  }
}
signUp("test11@mail.ru", "knopka");
