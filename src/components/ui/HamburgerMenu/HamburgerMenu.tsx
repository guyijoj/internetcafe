import React, { use, useState } from "react";
import styles from "./HamburgerMenu.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { menuItem } from "../../../types/cart";
import { useModal } from "../Modal/useModal";

const HamburgerMenu = () => {
  const { openModal } = useModal();
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <div className={styles.nav}>
      <RxHamburgerMenu
        className={styles.burger}
        onClick={() => setMenuOpen(!isMenuOpen)}
        size={35}
      />

      <div
        className={`${styles.mobileMenu} ${
          isMenuOpen ? styles.mobileMenuActive : ""
        }`}
      >
        <ul className={styles.menu}>
          <li
            className={`${styles.menuItem} `}
            onClick={() => {
              openModal("restaurants");
              setMenuOpen(false);
            }}
          >
            Рестораны
          </li>
          <li
            className={styles.menuItem}
            onClick={() => {
              openModal("jobs", { ref: "header" });
              setMenuOpen(false);
            }}
          >
            Работа у нас
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
