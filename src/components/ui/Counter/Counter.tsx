"use client";
import styles from "./Counter.module.css";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import {
  decreaseUtensils,
  increaseUtensils,
  selectUtensilsItem,
} from "../../../stores/slices/cartSLice";

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
  const utensils = useAppSelector(selectUtensilsItem);
  const dispatch = useAppDispatch();
  const decDisabled = utensils < min;
  const incDisabled = utensils >= max;

  return (
    <div
      className={[styles.row, className].filter(Boolean).join(" ")}
      role="group"
      tabIndex={0}
    >
      <div className={styles.label}>{label}</div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.btn}
          aria-label="Убавить"
          onClick={() => dispatch(decreaseUtensils())}
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
          onClick={() => dispatch(increaseUtensils())}
          disabled={incDisabled}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
