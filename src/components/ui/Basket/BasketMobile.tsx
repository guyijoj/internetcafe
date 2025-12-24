import React, { useState } from "react";
import styles from "./BasketMobile.module.css";
import { useCart } from "../../../context/CartContext";
import { GrBasket } from "react-icons/gr";
import { FaRegTrashCan } from "react-icons/fa6";
import Order from "../Order/Order";
import Counter from "../Counter/Counter";

const BasketMobile = () => {
  const { items, total, clearCart } = useCart();
  const [utensils, setUtensils] = useState(1);
  return (
    <div className={`${styles.basketSection} `}>
      {items.length === 0 ? (
        <div className={`${styles.empty}`}>
          <GrBasket size={60} />
          <h1 className={styles.mainHeading}>Корзина пуста!</h1>
          <h2 className={styles.subHeading}>Самовызов с 11:00 до 22:45</h2>
        </div>
      ) : (
        <>
          <div className={`${styles.basket}`}>
            <div className={styles.trash}>
              <FaRegTrashCan onClick={clearCart} size={25} />
            </div>
            <div className={styles.order}>
              {items.map((item, i) => (
                <Order item={item} />
              ))}
            </div>
            <div className={styles.total}>
              <p>Стоимость заказа:</p>
              <h2 className={styles.amount}>{total} ₽</h2>
            </div>
            <div className={styles.cutlery}>
              <Counter
                value={utensils}
                onChange={setUtensils}
                min={0}
                max={10}
              />
            </div>

            <div className={styles.submit}>
              <button className={styles.button}>Оформить заказ</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BasketMobile;
