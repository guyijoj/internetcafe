async function validateUser(name, phone, email, pool) {
  try {
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
            RETURNING id;
            `,
        [name, phone, email],
      );
      return createNewUser.rows[0].id;
    }
    return existingUser.rows[0].id;
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error(message);
    throw e;
  }
}

module.exports = {
  validateUser,
};
