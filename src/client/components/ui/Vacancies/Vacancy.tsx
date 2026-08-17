import styles from "./Vacancy.module.css";

type Props = {
  onApplyClick?: () => void; // можешь пробросить openModal('jobs')
};

export function Vacancy({ onApplyClick }: Props) {
  return (
    <section className={styles.wrap} aria-labelledby="careers-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.lead}>
            В сети ресторанов ВьетКафе открылась вакансия для креативного и
            позитивного сотрудника!
          </p>
        </header>

        <div className={styles.content}>
          <div className={styles.imageBox}>
            <img
              src="public/komanda.jpg.webp"
              alt="Команда ресторана ВьетКафе"
              className={styles.image}
              loading="lazy"
            />
          </div>

          <div className={styles.textBox}>
            <p>
              Мы большая семья, а родственные узы играют важную роль во
              вьетнамской культуре: этой ценности придерживается и коллектив
              ВьетКафе. Каждый в нашей семье уникален по-своему, и мы ценим это,
              помогая проявить себя и давая все инструменты для роста.
            </p>
            <p>
              Если ты ищешь работу в международной сети ресторанов вьетнамской
              кухни, амбициозен и ориентирован на результат, мы ждём именно
              тебя!
            </p>

            <ul className={styles.bullets}>
              <li>Оформление по ТК, бесплатное питание</li>
              <li>Гибкие графики: 2/2, 5/2</li>
              <li>Обучение и быстрый карьерный рост</li>
            </ul>

            {/* <div className={styles.actions}>
              <a href="/careers" className={styles.btnPrimary}>
                Открытые вакансии
              </a>
              {onApplyClick ? (
                <button
                  type="button"
                  className={styles.btnSecondary}
                  onClick={onApplyClick}
                >
                  Отправить резюме
                </button>
              ) : (
                <a href="/careers/apply" className={styles.btnSecondary}>
                  Отправить резюме
                </a>
              )}
            </div> */}

            <div className={styles.meta}>
              <span className={styles.tag}>Москва</span>
              <span className={styles.dot} />
              <span className={styles.tag}>Полная/частичная занятость</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
