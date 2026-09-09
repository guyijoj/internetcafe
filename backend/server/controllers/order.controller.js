const pool = require("../db");
const { OrderSchema } = require("../schema/order.schema");
const { validateUser } = require("../service/auth-service");
const { generateOrderNumber, productMap } = require("../service/order-service");

exports.createorder = async (req, res) => {
  const client = await pool.connect();
  try {
    const orderValidation = OrderSchema.safeParse(req.body);
    if (!orderValidation.success) {
      return res.status(400).json({
        message: "Invalid order's data",
        errors: orderValidation.error.issues,
      });
    }
    const {
      name,
      phone,
      email,
      restaurantId,
      payment_method,
      comment,
      utensils,
      items,
    } = orderValidation.data;
    await client.query("BEGIN");

    const userId = await validateUser(name, phone, email, client);
    if (!userId)
      return res.status(400).json({
        message: "User doesn't exist",
        error: "Failed to create/find user",
      });

    const orderNumber = generateOrderNumber();
    const { priceMap, totalPrice } = await productMap(items, client);

    const order = await client.query(
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

      await client.query(
        `
        insert into order_items(order_id,menu_item_id,price_at_time,quantity)
        values($1,$2,$3,$4)
        `,
        [orderId, item.id, price, item.quantity],
      );
    }
    await client.query("COMMIT");

    return res.status(200).json({ message: "order created" });
  } catch (e) {
    await client.query("ROLLBACK");
    const message = e instanceof Error ? e.message : "Unknown server error";

    console.error(message);

    return res.status(500).json({ message: "server error", error: message });
  }
};
