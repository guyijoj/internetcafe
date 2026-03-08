"use client";
import { useCallback, useMemo, useState } from "react";
import styles from "./Counter.module.css";
import { useCart } from "../../../context/CartContext";

type Props = {
  label?: string;

  min?: number;
  max?: number;

  className?: string;
};

export const Counter = ({
  label = "Приборы",
  min = 1,
  max = 20,
  className,
}: Props) => {
  const { utensils, incrementUtesils, decrementUtensils } = useCart();

  const decDisabled = utensils < min;
  const incDisabled = utensils >= max;

  // // Доступность с клавиатуры (← уменьшить, → увеличить)
  // const keyHandler = useCallback(
  //   (e: React.KeyboardEvent<HTMLDivElement>) => {
  //     if (e.key === "ArrowLeft") {
  //       e.preventDefault();
  //       !decDisabled && decrementUtensils();
  //     } else if (e.key === "ArrowRight") {
  //       e.preventDefault();
  //       !incDisabled && incrementUtesils();
  //     }
  //   },
  //   [decDisabled, incDisabled, incrementUtesils, decrementUtensils],
  // );

  return (
    <div
      className={[styles.row, className].filter(Boolean).join(" ")}
      role="group"
      tabIndex={0}
      // onKeyDown={keyHandler}
    >
      <div className={styles.label}>{label}</div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.btn}
          aria-label="Убавить"
          onClick={decrementUtensils}
          disabled={decDisabled}
        >
          –
        </button>

        <span className={styles.value} aria-live="polite">
          {utensils}
        </span>

        <button
          type="button"
          className={styles.btn}
          aria-label="Добавить"
          onClick={incrementUtesils}
          disabled={incDisabled}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
