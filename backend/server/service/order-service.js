const generateOrderNumber = () => {
  const date = new Date();

  const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");

  const random = Math.floor(1000 + Math.random() * 9000);

  return `ORD-${formattedDate}-${random}`;
};
async function productMap(items, client) {
  const itemIds = items.map((item) => item.id);
  const uniqueIds = [...new Set(itemIds)];

  // Проверяем повторяющиеся ID
  if (uniqueIds.length !== itemIds.length) {
    throw new Error("Duplicated item id");
  }

  // Получаем настоящие цены из базы
  const prices = await client.query(
    `
      SELECT item_id, price
      FROM menu_items
      WHERE item_id = ANY($1)
    `,
    [uniqueIds],
  );

  const priceMap = new Map();

  for (const row of prices.rows) {
    const price = Number(row.price);

    if (!Number.isFinite(price)) {
      throw new Error(`Invalid price for item ${row.item_id}`);
    }

    priceMap.set(row.item_id, price);
  }

  // Проверяем, что все товары найдены
  const missingIds = uniqueIds.filter(
    (id) => !priceMap.has(id),
  );

  if (missingIds.length > 0) {
    throw new Error(
      `Items not found: ${missingIds.join(", ")}`,
    );
  }

  // Рассчитываем итог с учётом количества
  const totalPrice = items.reduce((total, item) => {
    const itemPrice = priceMap.get(item.id);

    return total + itemPrice * item.quantity;
  }, 0);

  return {
    priceMap,
    totalPrice,
  };
}

module.exports = {
  generateOrderNumber,
  productMap,
};
