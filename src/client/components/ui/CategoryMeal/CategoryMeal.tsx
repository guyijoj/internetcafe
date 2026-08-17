import MenuCard from "../MenuCard/MenuCard";
import styles from "./CategoryMeal.module.css";

import { useCart } from "../../../context/CartContext";
import { menuItem, CartItem } from "../../../types/cart";
import Quantity from "../Quantity/Quantity";

type CategoryMealProps = {
  children: string;
  id: string;
  cardItems: menuItem[];
};
export const CategoryMeal = ({
  children,
  id,
  cardItems,
}: CategoryMealProps) => {
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
  return (
    <section id={id}>
      <h2 className={styles.title}>{children}</h2>

      <div className={styles.meals}>
        {cardItems.map((item, index) => (
          <MenuCard
            key={index}
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
        ))}
      </div>
    </section>
  );
};
