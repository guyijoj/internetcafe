const pool = require("../server/db");

async function dropUsers() {
  try {
    await pool.query(`
              truncate users CASCADE;`);
    console.log("✅ users очищен");
  } catch (e) {
    console.error("Ошибка при очищении users " + e);
  } finally {
    await pool.end();
  }
}

dropUsers();
