
import styles from "./MenuSkeleton.module.css";

const categoryCount = 2;
const cardsPerCategory = 5;

const SkeletonMenu = () => {
  return (
    <div className={styles.skeletonMenu}>
      {Array.from({ length: categoryCount }).map((_, categoryIndex) => (
        <section key={categoryIndex} className={styles.skeletonCategory}>
          <div className={styles.skeletonTitle} />
          <div className={styles.menuCards}>
            {Array.from({ length: cardsPerCategory }).map((__, cardIndex) => (
              <div key={cardIndex} className={styles.menuCard}>
                <div className={styles.menuCardImage} />
                <div className={styles.menuCardInfo}>
                    <div className={styles.menuCardName} />
                    <div className={styles.menuCardDescription} />
                    <div className={styles.menuCardDescription} />
                    <div className={styles.menuCardPrice} />
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default SkeletonMenu;