import styles from "./Menu.module.css";



import { categoryWithMenu, menuItem } from "../../../types/cart";

import { useEffect, useState } from "react";

import MenuCard from "../MenuCard/MenuCard";
import { useCart } from "../../../context/CartContext";

export const Menu = () => {
  const [categories, setCategories] = useState<categoryWithMenu[]>([])
  const [loading, setloading] = useState<boolean>(true)
  const [error, setError] = useState<null|string>(null)

  const { items, addItem } = useCart();

  const handleAdd = (item: menuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image_url,
      quantity: 1,
    });
  };

  useEffect(() => {
    async function loadMenu() {
      try{
        setloading(true);
        setloading(false);
        const response = await fetch("http://localhost:4000/api/menu");
        if(!response.ok) throw new Error(`Ошибка загрузки меню - ${response.status}`)

        const data = await response.json();
        setCategories(data);
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
    {categories.map((category) => (
      <section key={category.category_id}>
<h2 className={styles.categoryTitle}>{category.category_name}</h2>
<div className={styles.menuCards}>
      {category.items.map((item) => (
         <MenuCard
         key={item.id}
         imageSrc={item.image_url}
         imageAlt={`Блюдо ${item.name}`}
         title={item.name}
         description={item.description}
         weightGrams={item.weight}
         priceRub={item.price}
         counter={
           items.find((cartItem) => cartItem.id === item.id) || undefined
         }
         onClick={() => handleAdd(item)}
       />
      )
       
      )}
</div>
        </section>
    ))}
  </div>
  );
}
