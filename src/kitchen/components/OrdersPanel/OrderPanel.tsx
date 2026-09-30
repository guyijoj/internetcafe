import { useEffect, useState } from "react";
import { OrderType } from "../../types/OrderType";
import OrderCard from "../../ui/OrderCard/OrderCard";
import styles from "./OrderPanel.module.css";

const OrderPanel = () => {
  const [orders, setOrders] = useState<OrderType[] | null>(null);
  useEffect(() => {
    async function getOrders() {
      const accessToken = sessionStorage.getItem("access_token");
      const result = await fetch("http://localhost:4000/api/order/getOrders", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });

      const data = await result.json();
      console.log(data.orders);
      setOrders(data.orders);
    }
    getOrders();
  }, []);
  return (
    <div className={styles.orderSection}>
      {orders?.length ? (
        <div className={styles.orderCards}>
          {orders.map((order) => (
            <OrderCard data={order} key={order.id} />
          ))}
        </div>
      ) : (
        <h1>Нет заказов</h1>
      )}
    </div>
  );
};

export default OrderPanel;
