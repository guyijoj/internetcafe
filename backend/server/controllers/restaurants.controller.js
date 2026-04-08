const pool = require("../db");

exports.getRestaurants = async (req, res) => {
  try {
    const result = await pool.query(`select * from restaurants`);
    res.json(result.rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
};
