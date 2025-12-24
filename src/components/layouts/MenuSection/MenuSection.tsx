import styles from "./MenuSection.module.css";
import CarouselMenu from "../../ui/CarouselMenu/CarouselMenu";
import { Menu } from "../../ui/Menu/Menu";
import { Basket } from "../../ui/Basket/Basket";
import BasketMobile from "../../ui/Basket/BasketMobileButton";

export const MenuSection = () => {
  return (
    <section className={styles.sectionMenu}>
      <CarouselMenu
        slidesPerView={5}
        peek={16}
        gap={12}
        loop={false}
        dragFree={true}
        showArrows={true}
        headerOffset={150}
      />
      <div className={styles.container}>
        <Menu />
        <Basket />
      </div>
      <div className={styles.basketMobile}>
        <BasketMobile />
      </div>
    </section>
  );
};
