import React, { useState } from "react";
import styles from "./Restaurants.module.css";

interface Location {
  image: string;
  address: string;
  hours: string[];
  phone: string;
  link: string;
}
interface Locations {
  [key: number]: Location;
}

export const Restaurants = () => {
  const [islocationTrue, setLocationTrue] = useState(1);
  const locations: Locations = {
    1: {
      image: "/1_restaurant.webp",
      address: "Газетный пер., 3",
      hours: ["11:00 - 22:00"],
      phone: "+7 (926) 469-68-04",
      link: "https://yandex.ru/maps/org/vyetkafe/1001653542/?from=tabbar&ll=37.604854%2C55.757222&source=serp_navig&z=16.42",
    },
    2: {
      image: "/2_restaurant.webp",
      address: "Кировоградская, 13А (ТРЦ Columbus, 4-й этаж)",
      hours: ["ВС-ЧТ 10:00 – 22:00", " ПТ-СБ 10:00 – 23:00"],
      phone: "+7 (925) 456-34-54",
      link: "https://yandex.ru/maps/org/vyetkafe/194155237034/?from=tabbar&ll=37.603920%2C55.612147&source=serp_navig&z=16.42",
    },
    3: {
      image: "/3_restaurant.webp",
      address: "ул. Намёткина, 13А",
      hours: ["11:00 - 23:00"],
      phone: "+7 (925) 079-78-63",
      link: "https://yandex.ru/maps/org/vyetkafe/1085502016/?from=tabbar&ll=37.551368%2C55.662745&source=serp_navig&z=16.42",
    },
  };
  const chosenLocation = locations[islocationTrue];
  return (
    <div className={styles.body}>
      <div className={styles.tab}>
        <button
          onClick={() => setLocationTrue(1)}
          className={`${styles.metro} ${
            islocationTrue === 1 ? styles.metroTrue : ""
          }`}
        >
          М: Охотный ряд
        </button>
        <button
          onClick={() => setLocationTrue(2)}
          className={`${styles.metro} ${
            islocationTrue === 2 ? styles.metroTrue : ""
          }`}
        >
          М: Пражская
        </button>
        <button
          onClick={() => setLocationTrue(3)}
          className={`${styles.metro} ${
            islocationTrue === 3 ? styles.metroTrue : ""
          }`}
        >
          М: Новые Черёмышки
        </button>
      </div>

      <div className={styles.card}>
        <div className={styles.photoCon}>
          <img
            src={`public/${chosenLocation.image}`}
            alt="restaurant"
            className={styles.photo}
          />
        </div>
        <div className={styles.infoPart}>
          <div>
            <h3>Адрес:</h3>
            <p className={styles.info}>{chosenLocation.address}</p>

            <h3>График работы:</h3>
            <p className={styles.info}>
              {chosenLocation.hours.map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </p>

            <h3>Контакты</h3>

            <a href={`tel:${chosenLocation.phone}`} className={styles.info}>
              {chosenLocation.phone}
            </a>
          </div>

          <a href={chosenLocation.link} className={styles.link}>
            Посмотреть на карте &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};
