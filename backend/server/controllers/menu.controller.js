const pool = require("../db");

exports.getMenu = async (req, res) => {
  try {
    const result = await pool.query(`
            select 
                c.category_id,
                c.category_name,
                json_agg(
                json_build_object(
                    'id', mi.item_id,
                    'name', mi.name,
                    'description', mi.description,
                    'price', mi.price,
                    'weight', mi.weight,
                    'image_url', mi.image_url)
                    order by mi.item_id
                    ) as items
            from menu_items as mi
            join category as c on mi.category_id = c.category_id
            GROUP BY c.category_id, c.category_name
            order by c.category_id;`);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
