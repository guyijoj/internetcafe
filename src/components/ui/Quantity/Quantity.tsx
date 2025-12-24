import React from "react";

import styles from "./Quantity.module.css";

interface QuantityProps {
  value: number;
  onDec: () => void;
  onInc: () => void;
  min: number;
  max: number;
}

const Quantity = ({ value, onDec, onInc, min, max }: QuantityProps) => {
  return (
    <div className={styles.quantity}>
      <div className={styles.dec}>
        <button onClick={onDec}>-</button>
      </div>
      <div className={styles.number}>{value}</div>
      <div className={styles.inc}>
        <button disabled={value > max - 1} onClick={onInc}>
          +
        </button>
      </div>
    </div>
  );
};

export default Quantity;
