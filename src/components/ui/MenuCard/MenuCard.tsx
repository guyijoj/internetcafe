"use client";

import { MouseEventHandler } from "react";
import Quantity from "../Quantity/Quantity";
import styles from "./MenuCard.module.css";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { addItem, selectCartItems } from "../../../stores/slices/cartSLice";

type MenuCardProps = {
  itemId: number;
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string | null;
  weightGrams?: number;
  priceRub: number;
  disabled?: boolean;
};

const MenuCard = ({
  itemId,
  imageSrc,
  imageAlt = "",
  title,
  description,
  weightGrams,
  priceRub,
  disabled = false,
}: MenuCardProps) => {
  const priceText = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(priceRub);

  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const quantity =
    items.find((item) => {
      return item.id === itemId;
    })?.quantity || 0;
  const isSelected = quantity > 0;

  const clickButton: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(
      addItem({
        id: itemId,
        name: title,
        price: priceRub,
        image: imageSrc,
        quantity: 1,
      }),
    );
    console.log(items);
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

      {isSelected ? (
        <div className={`${styles.counter} ${styles.show}`}>
          <Quantity itemId={itemId} value={quantity} min={1} max={30} />
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
            {`${priceRub} ₽ `}
          </button>
        </div>
      )}
    </article>
  );
};

export default MenuCard;
