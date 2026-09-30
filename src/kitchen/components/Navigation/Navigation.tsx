import LogOutButton from "../../../client/components/ui/LogoutButton/LogOutButton";
import RestaurantButton from "../../ui/RestaurantButton/RestaurantButton";
import styles from "./Navigation.module.css";

const NavigationKitchen = () => {
  return (
    <div className={styles.navigationSection}>
      <h1 className={styles.labelPage}>Kitchen panel</h1>
      <div className={styles.actions}>
        <div className={`${styles.btn} ${styles.restaurant}`}>
          <RestaurantButton />
        </div>
        <div className={styles.btn}>
          <LogOutButton />
        </div>
      </div>
    </div>
  );
};

export default NavigationKitchen;
