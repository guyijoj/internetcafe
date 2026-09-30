import React from "react";
import { OrderType } from "../../types/OrderType";
import styles from "./OrderCard.module.css";

type OrderCardProps = {
  data: OrderType;
};
const OrderCard = ({ data }: OrderCardProps) => {
  return <div className={styles.card}>{data.order_number}</div>;
};

export default OrderCard;
