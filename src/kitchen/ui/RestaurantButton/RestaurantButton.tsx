import { useEffect, useId, useRef, useState } from "react";
import type { restaurantsInfo } from "../../../client/types/restaurants";
import styles from "./RestaurantButton.module.css";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const RestaurantButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [restaurants, setRestaurants] = useState<restaurantsInfo[]>([]);
  const [selected, setSelected] = useState<restaurantsInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const controller = new AbortController();
    const loadRestaurants = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:4000/api/restaurants", {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Не удалось загрузить рестораны");
        const data: restaurantsInfo[] = await response.json();
        if (!controller.signal.aborted) setRestaurants(data);
      } catch {
        if (!controller.signal.aborted) {
          setError("Не удалось загрузить рестораны. Откройте меню ещё раз.");
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };
    void loadRestaurants();
    return () => controller.abort();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div
      className={styles.container}
      ref={containerRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={dropdownId}
        className={styles.btn}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className={styles.label}>{selected?.restaurant_name ?? "Ресторан"}</span>
        <MdOutlineKeyboardArrowDown
          aria-hidden="true"
          className={isOpen ? styles.arrowOpen : undefined}
        />
      </button>
      {isOpen && (
        <div id={dropdownId} className={styles.dropdown} aria-label="Рестораны">
          {isLoading ? (
            <p className={styles.message} role="status">Загрузка…</p>
          ) : error ? (
            <p className={styles.message} role="status">{error}</p>
          ) : restaurants.length === 0 ? (
            <p className={styles.message}>Рестораны не найдены</p>
          ) : (
            <ul className={styles.list}>
              {restaurants.map((restaurant) => (
                <li key={restaurant.id}>
                  <button
                    type="button"
                    className={styles.option}
                    aria-pressed={selected?.id === restaurant.id}
                    onClick={() => {
                      setSelected(restaurant);
                      setIsOpen(false);
                      buttonRef.current?.focus();
                    }}
                  >
                    <span>{restaurant.restaurant_name}</span>
                    <span className={styles.address}>{restaurant.address}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default RestaurantButton;
