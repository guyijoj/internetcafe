"use client";

import { MouseEventHandler, useState } from "react";
import { useCart } from "../../../context/CartContext";
import { CartItem } from "../../../types/cart";
import Quantity from "../Quantity/Quantity";
import styles from "./MenuCard.module.css";

type MenuCardProps = {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string | null;
  weightGrams?: number;
  priceRub: number;
  onClick?: () => void;
  counter: CartItem | undefined;
  disabled?: boolean;
};

const MenuCard = ({
  imageSrc,
  imageAlt = "",
  title,
  description,
  weightGrams,
  priceRub,
  onClick,
  counter,
  disabled = false,
}: MenuCardProps) => {
  const priceText = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(priceRub);

  const [isSelected, setSelected] = useState(false);
  const { increment, decrement } = useCart();

  const counterchecked = counter ? counter.quantity : 0;

  const clickButton: MouseEventHandler<HTMLButtonElement> = () => {
    onClick?.();
    setSelected(true);
  };
  return (
    <article className={styles.card} aria-label={title}>
      <div className={styles.media}>
        <img className={styles.img} src={imageSrc} alt={imageAlt} />
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>
        {typeof weightGrams === "number" && (
          <div className={styles.weight}>{weightGrams} г</div>
        )}
      </div>

      {/* <div className={styles.footer}>
        <button
          type="button"
          className={styles.priceBtn}
          onClick={onClick}
          disabled={disabled}
          aria-label={`Добавить "${title}" за ${priceText}`}
        >
          {priceText}
        </button>
      </div> */}
      {/* <div className={styles.counter}>
        <Quantity
          value={counter ? counter.quantity : 0}
          onDec={() => decrement(counter ? counter.id : 0)}
          onInc={() => increment(counter ? counter.id : 0)}
          min={1}
          max={30}
        />
      </div> */}
      {isSelected && counterchecked > 0 ? (
        <div className={`${styles.counter} ${styles.show}`}>
          <Quantity
            value={counter ? counterchecked : 0}
            onDec={() => decrement(counter ? counter.id : 0)}
            onInc={() => increment(counter ? counter.id : 0)}
            min={1}
            max={30}
          />
        </div>
      ) : (
        <div className={`${styles.footer} ${styles.show}`}>
          <button
            type="button"
            className={styles.priceBtn}
            onClick={clickButton}
            disabled={disabled}
            aria-label={`Добавить "${title}" за ${priceText}`}
          >
            {priceText}
          </button>
        </div>
      )}
    </article>
  );
};

export default MenuCard;
