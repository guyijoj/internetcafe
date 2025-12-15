import styles from "./Menu.module.css";

import { CategoryMeal } from "../CategoryMeal/CategoryMeal";

import { categoryWithMenu } from "../../../types/cart";
import { useMenu } from "../../../context/MenuContext";

export const Menu = () => {
  const { categories, loading, error } = useMenu();

  return (
    <div className={styles.menu}>
      {categories.map((category: categoryWithMenu) => (
        <CategoryMeal id={category.id.toString()} items={category.menu_items}>
          {category.name}
        </CategoryMeal>
      ))}
    </div>
  );
};
