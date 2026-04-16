import React, { useEffect, useState } from "react";
import styles from "./Restaurants.module.css";
import { getRestaurants } from "../../../api/restaurants";
import { restaurantsInfo } from "../../../types/restaurants";
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

  const [islocationTrue, setLocationTrue] = useState<number | null>(() => {
    return Number(localStorage.getItem("restaurant_id")) || 1;
  });

  const [restaurants, setRestaurants] = useState<restaurantsInfo[]>([]);
  useEffect(() => {
    getRestaurants().then((data) => {
      setRestaurants(data);
    });
  }, []);
  const selectedRestaurant = restaurants.find((r) => r.id === islocationTrue);

  const buttonEvent = (goBack: boolean) => {
    if (!islocationTrue) return;
    if (!selectedRestaurant) return;
    localStorage.setItem("restaurant_id", String(islocationTrue));
    localStorage.setItem("restaurant_city", selectedRestaurant.city);
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
        {restaurants.map((restaurant) => (
          <button
            key={restaurant.id}
            onClick={() => setLocationTrue(restaurant.id)}
            className={`${styles.metro} ${
              islocationTrue === restaurant.id ? styles.metroTrue : ""
            }`}
          >
            {restaurant.city}
          </button>
        ))}
      </div>
      {selectedRestaurant && (
        <div
          key={selectedRestaurant.id}
          className={`${styles.card} ${islocationTrue === selectedRestaurant.id ? styles.cardTrue : ""}`}
        >
          <div className={styles.photoCon}>
            <img
              src={`${selectedRestaurant.photo}`}
              alt="restaurant"
              className={styles.photo}
            />
          </div>
          <div className={styles.infoPart}>
            <div>
              <h3>Адрес:</h3>
              <p className={styles.info}>{selectedRestaurant.address}</p>

              <h3>График работы:</h3>
              <p className={styles.info}>{selectedRestaurant.workingHours}</p>

              <h3>Контакты</h3>

              <a
                href={`tel:${selectedRestaurant.phone}`}
                className={styles.info}
              >
                {selectedRestaurant.phone}
              </a>
            </div>

            <a href={selectedRestaurant.link} className={styles.link}>
              Посмотреть на карте &rarr;
            </a>
          </div>
        </div>
      )}
      <button className={styles.btn} onClick={() => buttonEvent(goBack)}>
        Выбрать
      </button>
    </div>
  );
};
