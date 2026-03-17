import styles from "./Menu.module.css";

import { CategoryMeal } from "../CategoryMeal/CategoryMeal";

import { categoryWithMenu, menuItem } from "../../../types/cart";
import { useMenu } from "../../../context/MenuContext";
import { useEffect, useState } from "react";
import { string } from "zod";

// export const Menu = () => {
//   const { categories, loading, error } = useMenu();

//   return (
//     <div className={styles.menu}>
//       {categories.map((category: categoryWithMenu) => (
//         <CategoryMeal
//           id={category.id.toString()}
//           cardItems={category.menu_items}
//         >
//           {category.name}
//         </CategoryMeal>
//       ))}
//     </div>
//   );
// };

export const Menu = () => {
  const [items, setItems] = useState<menuItem[]>([])
  const [loading, setloading] = useState<boolean>(true)
  const [error, setError] = useState<null|string>(null)

  useEffect(() => {
    async function loadMenu() {
      try{
        setloading(true);
        setloading(false);
        const response = await fetch("http://localhost:4000/api/menu");
        if(!response.ok) throw new Error(`Ошибка загрузки меню - ${response.status}`)

        const data = await response.json();
        setItems(data);
      }catch(e){
        setError("Не удалось загрузить меню")
        console.error(e);
      }finally{
        setloading(false);
      }
    }

    loadMenu()
  },[])
  return (
    <div className={styles.menu}>
    {items.map((item) => (
      <div key={item.id}>{item.name} — {item.price}₽</div>
    ))}
  </div>
  );
}
