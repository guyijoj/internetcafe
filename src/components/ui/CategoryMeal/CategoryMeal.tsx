import MenuCard from "../MenuCard/MenuCard";
import styles from "./CategoryMeal.module.css";

import { useCart } from "../../../context/CartContext";
import { menuItem } from "../../../types/cart";

type CategoryMealProps = {
  children: string;
  id: string;
  items: menuItem[];
};
export const CategoryMeal = ({ children, id, items }: CategoryMealProps) => {
  const { addItem } = useCart();

  const handleAdd = (item: menuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image_url,
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
            imageSrc={item.image_url}
            imageAlt={`Блюдо ${item.name}`}
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
