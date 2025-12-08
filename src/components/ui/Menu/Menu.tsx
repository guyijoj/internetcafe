import React from "react";
import styles from "./Menu.module.css";

import { CategoryMeal } from "../CategoryMeal/CategoryMeal";
import { menu } from "../../../data/menu";

export const Menu = () => {
  return (
    <div className={styles.menu}>
      {menu.map((section) => (
        <CategoryMeal id={section.id} items={section.items}>
          {section.label}
        </CategoryMeal>
      ))}
    </div>
  );
};
