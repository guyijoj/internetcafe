"use client";
import { useCallback, useMemo, useState } from "react";
import styles from "./Counter.module.css";

type Props = {
  label?: string; // Подпись слева (по умолчанию "Приборы")
  value?: number; // Контролируемое значение
  defaultValue?: number; // Неконтролируемый режим (стартовое значение)
  min?: number; // Минимум (обычно 0 или 1)
  max?: number; // Максимум (например, 20)
  step?: number; // Шаг
  onChange?: (next: number) => void; // Колбэк при изменении
  className?: string; // Доп. класс-обёртка
};

export const Counter = ({
  label = "Приборы",
  value,
  defaultValue = 1,
  min = 0,
  max = 20,
  step = 1,
  onChange,
  className,
}: Props) => {
  const isControlled = typeof value === "number";
  const [internal, setInternal] = useState<number>(defaultValue);

  const current = isControlled ? (value as number) : internal;

  const decDisabled = current - step < min;
  const incDisabled = current + step > max;

  const setNext = useCallback(
    (next: number) => {
      const clamped = Math.max(min, Math.min(max, next));
      if (!isControlled) setInternal(clamped);
      onChange?.(clamped);
    },
    [isControlled, max, min, onChange]
  );

  const onDec = useCallback(
    () => setNext(current - step),
    [current, setNext, step]
  );
  const onInc = useCallback(
    () => setNext(current + step),
    [current, setNext, step]
  );

  // Доступность с клавиатуры (← уменьшить, → увеличить)
  const keyHandler = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        !decDisabled && onDec();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        !incDisabled && onInc();
      }
    },
    [decDisabled, incDisabled, onDec, onInc]
  );

  const ariaLabel = useMemo(() => `${label}: ${current}`, [label, current]);

  return (
    <div
      className={[styles.row, className].filter(Boolean).join(" ")}
      role="group"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={keyHandler}
    >
      <div className={styles.label}>{label}</div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.btn}
          aria-label="Убавить"
          onClick={onDec}
          disabled={decDisabled}
        >
          –
        </button>

        <span className={styles.value} aria-live="polite">
          {current}
        </span>

        <button
          type="button"
          className={styles.btn}
          aria-label="Добавить"
          onClick={onInc}
          disabled={incDisabled}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
