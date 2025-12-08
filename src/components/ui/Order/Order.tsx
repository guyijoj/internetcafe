import React from "react";
import { useCart } from "../../../context/CartContext";
import styles from "./Order.module.css";
import { CartItem } from "../../../types/cart";

const Order = ({ item }: { item: CartItem }) => {
  //   const { increment, decrement } = useCart();
  return (
    <div className={styles.row}>
      <img src={item.image} alt={item.name} className={styles.thumb} />

      <div className={styles.main}>
        <div className={styles.title}>{item.name}</div>
      </div>

      <div className={styles.price}>{item.price.toLocaleString()} ₽</div>
      {/* 
      <div className={styles.qty}>
        <Quantity
          value={item.quantity}
          onDec={() => decrement(item.id)}
          onInc={() => increment(item.id)}
          min={1}
          max={99}
        />
      </div> */}
    </div>
  );
};

export default Order;
