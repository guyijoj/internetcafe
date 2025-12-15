import { useState } from "react";
import { GrBasket } from "react-icons/gr";
import { FaRegTrashCan } from "react-icons/fa6";
import styles from "./Basket.module.css";
import { useCart } from "../../../context/CartContext";
import Counter from "../Counter/Counter";
import Order from "../Order/Order";

export const Basket = () => {
  const { items, total, clearCart } = useCart();
  const [utensils, setUtensils] = useState(1);

  return (
    <div className={`${styles.basketSection} `}>
      <div className={` ${styles.sticky}`}>
        {items.length === 0 ? (
          <div className={`${styles.empty}`}>
            <GrBasket size={60} />
            <h1 className={styles.mainHeading}>Корзина пуста!</h1>
            <h2 className={styles.subHeading}>Самовызов с 11:00 до 22:45</h2>
          </div>
        ) : (
          <>
            <div className={`${styles.basket}`}>
              <div className={styles.headerBasket}>
                <h2>Заказ</h2>
                <a onClick={clearCart} className={styles.trash}>
                  <FaRegTrashCan size={25} />
                </a>
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

              <button className={styles.button}>Оформить заказ</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
