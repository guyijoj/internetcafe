import React from "react";

import styles from "./Order.module.css";
import { CartItem } from "../../../types/cart";
import Quantity from "../Quantity/Quantity";

const Order = ({ item }: { item: CartItem }) => {
  return (
    <div className={styles.row}>
      <img src={item.image} alt={item.name} className={styles.thumb} />

      <div className={styles.main}>
        <div className={styles.title}>{item.name}</div>
      </div>

      <div className={styles.qty}>
        <div className={styles.price}>{item.price.toLocaleString()} ₽</div>
        <Quantity value={item.quantity} itemId={item.id} />
      </div>
    </div>
  );
};

export default Order;
