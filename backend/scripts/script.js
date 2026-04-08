const pool = require("../server/db");

async function runningScript() {
  try {
    await pool.query(`
        create table order_items(
        id serial primary key,
        order_id int not null,
        menu_item_id int not null,
        price_at_time decimal(10,2) not null,
        quantity int not null,
        created_at timestamptz default now(),
        foreign key (order_id) references orders(id) on delete cascade,
        foreign key (menu_item_id) references menu_items(item_id) on delete restrict,
        unique(order_id, menu_item_id)
    );
        `);
    console.log("Успешный запуск скрипта");
  } catch (e) {
    console.log("ОШИБКА - ", e);
  } finally {
    await pool.end();
  }
}

runningScript();
