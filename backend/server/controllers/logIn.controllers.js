const bcrypt = require("bcrypt");
const pool = require("../db");
const { Loginschema } = require("../schema/auth.schema");

exports.postAuth = async (req, res) => {
  try {
    const validation = Loginschema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        errors: validation.error,
      });
    }
    const { login, password } = validation.data;

    const existingAdmin = await pool.query(
      `
      select * from admins where email = $1;
    `,
      [login],
    );
    if (!existingAdmin) throw new Error();
    const UserPassword = existingAdmin.rows[0].password_hash;
    // const hashPassword = await bcrypt.hash(password, 12);
    const isPassword = await bcrypt.compare(password, UserPassword);

    if (!isPassword) {
      throw new Error();
    }

    return res.json({
      login,
      password,
    });
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      success: false,
      errors: "Неправильное логин и пароль",
    });
  }
};
