import styles from "./Navigation.module.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { useModal } from "../../ui/Modal/useModal";
export const Navigation = () => {
  const { openModal } = useModal();
  const restaurantNumber = "+7 (495) 215-11-99";
  return (
    <>
      <div className={`${styles.nav} ${styles.sticky}`}>
        <img src="public/logo2.png" className={styles.logo_image} />
        <div className={styles.nav_info}>
          <button
            type="button"
            className={styles.restaurant}
            onClick={() => openModal("restaurants")}
            aria-haspopup="dialog"
            aria-controls="restaurants-modal"
          >
            Рестораны
          </button>
          <button
            type="button"
            className={styles.work}
            onClick={() => openModal("jobs", { ref: "header" })}
            aria-haspopup="dialog"
            aria-controls="modal-jobs"
          >
            Работа у нас
          </button>
          <a href={`tel:${restaurantNumber}`} className={styles.phone_number}>
            {restaurantNumber}
          </a>
          <RxHamburgerMenu size={35} />
        </div>
      </div>
    </>
  );
};
