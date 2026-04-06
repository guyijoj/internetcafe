const pool = require("../db");

exports.createorder = async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    const existingUser = await pool.query(
      `
            select * from users
            where user_email =$1;
            `,
      [email],
    );

    if (existingUser.rows.length === 0) {
      const createNewUser = await pool.query(
        `
            insert into users(user_name, user_phone, user_email)
            values($1, $2, $3)
            `,
        [name, phone, email],
      );
      console.log("Новый пользователь создан!");
      res
        .status(200)
        .json({ message: "created new user", user: createNewUser.rows[0] });
    }
    res.status(200).json({ message: "users does exist" });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ message: "server error", error: e.message });
  }
};
