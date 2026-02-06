import styles from "./Navigation.module.css";

import { useModal } from "../../ui/Modal/useModal";
import { FaPhoneAlt } from "react-icons/fa";
import HamburgerMenu from "../../ui/HamburgerMenu/HamburgerMenu";
export const Navigation = () => {
  const { openModal } = useModal();

  return (
    <>
      <div className={`${styles.nav} ${styles.sticky}`}>
        <img src="/logo2.png" className={styles.logo_image} />
        <div className={styles.nav_info}>
          <button
            type="button"
            className={styles.restaurant}
            onClick={() => openModal("restaurants", false)}
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
          <a href={`tel:+74952151199}`} className={styles.phone_number}>
            +7 (495) 215-11-99
          </a>
        </div>
        <div className={styles.burger}>
          <HamburgerMenu />
        </div>
      </div>
    </>
  );
};
