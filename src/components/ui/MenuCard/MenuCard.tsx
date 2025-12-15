"use client";

import styles from "./MenuCard.module.css";

type MenuCardProps = {
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string | null;
  weightGrams?: number;
  priceRub: number;
  onClick?: () => void;
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
  disabled = false,
}: MenuCardProps) => {
  const priceText = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(priceRub);

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

      <div className={styles.footer}>
        <button
          type="button"
          className={styles.priceBtn}
          onClick={onClick}
          disabled={disabled}
          aria-label={`Добавить "${title}" за ${priceText}`}
        >
          {priceText}
        </button>
      </div>
    </article>
  );
};

export default MenuCard;
