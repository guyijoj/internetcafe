import styles from "./Quantity.module.css";
import { useAppDispatch } from "../../../stores/hooks";
import { decreaseItem, increaseItem } from "../../../stores/slices/cartSLice";

interface QuantityProps {
  itemId: number;
  value: number;

  max?: number;
}

const Quantity = ({ value, itemId, max = 20 }: QuantityProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.quantity}>
      <div className={styles.dec}>
        <button onClick={() => dispatch(decreaseItem(itemId))}>-</button>
      </div>
      <div className={styles.number}>{value}</div>
      <div className={styles.inc}>
        <button
          disabled={value > max - 1}
          onClick={() => dispatch(increaseItem(itemId))}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Quantity;
