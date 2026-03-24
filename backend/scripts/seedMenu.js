
const fs = require('fs');
const pool = require("../server/db");

async function seedMenu() {
    try{
        const raw = fs.readFileSync('./data/menu.json', 'utf-8')
        const data = JSON.parse(raw);


        for (const item of data.menu){
            await pool.query(
               `INSERT INTO menu_items 
        (category_id, name, description, price, weight, image_url)
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          item.category_id,
          item.name,
          item.description || null,
          item.price,
          item.weight || null,
          item.image_url || null
        ]
            );
        }
        console.log('✅ Меню успешно загружено');

    }catch(e){
        console.error('ERRRRORRRRR', e)
    }finally{
        await pool.end();
    }
}

seedMenu();