import React from "react";
import styles from "./Basket.module.css";
import { PiBasket } from "react-icons/pi";
import { useModal } from "../Modal/useModal";
const BasketMobile = () => {
  const { openModal } = useModal();
  return (
    <button
      className={`${styles.basketMobile}`}
      onClick={() => openModal("mobileBasket")}
    >
      <PiBasket className={`${styles.basket}`} size={70} />
    </button>
  );
};

export default BasketMobile;
