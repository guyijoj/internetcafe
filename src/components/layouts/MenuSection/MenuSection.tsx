import React from "react";
import styles from "./MenuSection.module.css";
import CarouselMenu from "../../ui/CarouselMenu/CarouselMenu";
import { Menu } from "../../ui/Menu/Menu";
import { Basket } from "../../ui/Basket/Basket";
import { menu } from "../../../data/menu";

export const MenuSection = () => {
  return (
    <section className={styles.sectionMenu}>
      <CarouselMenu
        items={menu}
        slidesPerView={5}
        peek={16}
        gap={12}
        loop={false}
        dragFree={true}
        showArrows={true}
        headerOffset={150}
      />
      <div className={styles.container}>
        <Menu />
        <Basket />
      </div>
    </section>
  );
};

// путь: src/app/page.tsx (или где нужно)
