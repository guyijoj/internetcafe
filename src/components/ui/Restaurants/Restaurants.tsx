import React, { useEffect, useState } from "react";
import styles from "./Restaurants.module.css";
import { getRestaurants } from "../../../api/restaurants";
import {
  restaurantsInfo,
  RestaurantsModalPayload,
} from "../../../types/restaurants";
import { useModal } from "../Modal/useModal";
import { useCart } from "../../../context/CartContext";

export const Restaurants = ({
  onClose,
  goBack,
}: {
  onClose: () => void;
  goBack: boolean;
}) => {
  const { total } = useCart();
  const { openModal } = useModal();
  const [islocationTrue, setLocationTrue] = useState<string | null>(
    localStorage.getItem("restaurant_id"),
  );
  const [isShowingTrue, setShowingTrue] = useState<string | null>(
    localStorage.getItem("restaurant_id") || null,
  );
  const [restaurants, setRestaurants] = useState<restaurantsInfo[]>([]);
  useEffect(() => {
    getRestaurants().then((data) => {
      setRestaurants(data);
      if (!isShowingTrue && data.length > 0) setLocationTrue(data[0].id);
    });
  }, []);

  const buttonEvent = (goBack: boolean) => {
    if (!islocationTrue) return;
    const restaurant = restaurants.find((r) => r.id === islocationTrue);
    if (!restaurant) return;
    localStorage.setItem("restaurant_id", islocationTrue);
    localStorage.setItem("restaurant_city", restaurant.city);
    if (goBack) {
      openModal("checkout", { total: total });
    } else {
      onClose();
    }
    return;
  };

  return (
    <div className={styles.body}>
      <div className={styles.tab}>
        {restaurants.map((restaurant, index) => (
          <button
            key={index}
            onClick={() => setLocationTrue(restaurant.id)}
            className={`${styles.metro} ${
              islocationTrue === restaurant.id ? styles.metroTrue : ""
            }`}
          >
            {restaurant.city}
          </button>
        ))}
      </div>
      {restaurants.map((restaurant, index) => (
        <div
          key={index}
          className={`${styles.card} ${islocationTrue === restaurant.id ? styles.cardTrue : ""}`}
        >
          <div className={styles.photoCon}>
            <img
              src={`${restaurant.photo}`}
              alt="restaurant"
              className={styles.photo}
            />
          </div>
          <div className={styles.infoPart}>
            <div>
              <h3>Адрес:</h3>
              <p className={styles.info}>{restaurant.address}</p>

              <h3>График работы:</h3>
              <p className={styles.info}>{restaurant.workingHours}</p>

              <h3>Контакты</h3>

              <a href={`tel:${restaurant.phone}`} className={styles.info}>
                {restaurant.phone}
              </a>
            </div>

            <a href={restaurant.link} className={styles.link}>
              Посмотреть на карте &rarr;
            </a>
          </div>
        </div>
      ))}
      <button className={styles.btn} onClick={() => buttonEvent(goBack)}>
        Выбрать
      </button>
    </div>
  );
};
