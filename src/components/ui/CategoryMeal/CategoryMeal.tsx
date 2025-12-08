import { Children } from "react";
import MenuCard from "../MenuCard/MenuCard";
import styles from "./CategoryMeal.module.css";
import { Item } from "../../../data/menu";
import { useCart } from "../../../context/CartContext";

type CategoryMealProps = {
  children: string;
  items: Item[];
  id: string;
};
export const CategoryMeal = ({ children, items, id }: CategoryMealProps) => {
  const { addItem } = useCart();

  const handleAdd = (item: Item) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
  };
  return (
    <section id={id}>
      <h2 className={styles.title}>{children}</h2>

      <div className={styles.meals}>
        {items.map((item, index) => (
          <MenuCard
            key={index}
            imageSrc={item.image}
            imageAlt={`Блюдо ${item.id}`}
            title={item.name}
            description={item.description}
            weightGrams={item.weight}
            priceRub={item.price}
            onClick={() => handleAdd(item)}
          />
        ))}
      </div>
    </section>
  );
};
