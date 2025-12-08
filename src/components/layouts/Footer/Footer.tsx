"use client";

import styles from "./Footer.module.css";
import { SiVk } from "react-icons/si";
import { SiTelegram } from "react-icons/si";
import { FaCcMastercard } from "react-icons/fa6";
import { RiVisaLine } from "react-icons/ri";

export default function Footer() {
  return (
    <div className={styles.footer}>
      {/* Левый блок: контакты и юр-инфо */}
      <div className={styles.left}>
        <a className={styles.phone} href="tel:+74952151199">
          +7 (495) 215-11-99
        </a>
        <a className={styles.mail} href="mailto:feedback@vietcafe.ru">
          feedback@vietcafe.ru
        </a>

        <div className={styles.meta}>
          <div>
            По вопросам сотрудничества:{" "}
            <a href="mailto:info@vietcafe.ru">info@bunfo.ru</a>
          </div>
          <div>Бун Фо © 2025 г</div>
          <div>
            Разработка сайта:{" "}
            <a
              href="https://github.com/guyijoj"
              rel="noopener noreferrer"
              target="_blank"
            >
              Guyijoj
            </a>
          </div>
        </div>
      </div>

      {/* Центр: логотип */}
      <div className={styles.center}>
        <img
          className={styles.logo}
          src="public/logo2.png"
          alt="ВьетКафе — рестораны вьетнамской кухни"
        />
      </div>

      {/* Правый блок: соцсети и платёжные системы */}
      <div className={styles.right}>
        <div className={styles.socials} aria-label="Социальные сети">
          <a href="https://t.me/+sh9JTsgba-liNTFi" aria-label="Telegram">
            <SiTelegram size={35} />
          </a>
          <a href="https://vk.com/public42898320" aria-label="VK">
            <SiVk size={35} />
          </a>
        </div>

        <div className={styles.payments} aria-label="Платёжные системы">
          <FaCcMastercard size={55} />
          <RiVisaLine size={55} />
        </div>
      </div>
    </div>
  );
}
