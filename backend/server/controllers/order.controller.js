const { FaXTwitter } = require("react-icons/fa6");
const pool = require("../db");

exports.createorder = async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    await pool.query("BEGIN");

    const userId = await validateUser(name, phone, email);
    if (!userId)
      return res
        .status(400)
        .json({ message: "server error", error: "Failed to create/find user" });

    //CREATING ORDER
    const { restaurantId, payment_method, comment, utensils, items } = req.body;
    const orderNumber = generateOrderNumber();
    const priceMap = await productMap(items);
    const totalPrice = [...priceMap.values()].reduce(
      (acc, curr) => acc + curr,
      0,
    );
    const order = await pool.query(
      `
          insert into orders(restaurant_id, user_id, payment_method, total_price, comment, utensils, order_number)
          values($1,$2,$3,$4,$5,$6,$7 )
          returning id;
      `,
      [
        restaurantId,
        userId,
        payment_method,
        totalPrice,
        comment,
        utensils,
        orderNumber,
      ],
    );

    const orderId = order.rows[0].id;

    for (const item of items) {
      const price = priceMap.get(item.id);

      await pool.query(
        `
        insert into order_items(order_id,menu_item_id,price_at_time,quantity)
        values($1,$2,$3,$4)
        `,
        [orderId, item.id, price, item.quantity],
      );
    }
    await pool.query("COMMIT");
    return res.status(200).json({ message: "order created" });
  } catch (e) {
    await pool.query("ROLLBACK");
    console.error(e.message);
    return res.status(500).json({ message: "server error", error: e.message });
  }
};

async function validateUser(name, phone, email) {
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
    console.error(e.message);
    throw e;
  }
}
const generateOrderNumber = () => {
  const date = new Date();

  const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");

  const random = Math.floor(1000 + Math.random() * 9000);

  return `ORD-${formattedDate}-${random}`;
};

async function productMap(items) {
  const priceMap = new Map();
  const itemIds = items.map((item) => item.id);
  const prices = await pool.query(
    `
      select item_id , price from menu_items where item_id = ANY($1)`,
    [itemIds],
  );
  prices.rows.forEach((row) => priceMap.set(row.item_id, row.price));
  return priceMap;
}
