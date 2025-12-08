"use client";

import { useModal } from "./useModal";
import { RestaurantsModal } from "./modals/RestaurantsModal";
import { JobsModal } from "./modals/JobsModal";

/**
 * Здесь “регистрируем” все модалки по id.
 * Хочешь добавить новую — создай компонент и добавь ветку в switch.
 */
export function ModalRoot() {
  const { modalId, payload, closeModal } = useModal();

  if (!modalId) return null;

  switch (modalId) {
    case "restaurants":
      return <RestaurantsModal onClose={closeModal} />;
    case "jobs":
      return <JobsModal onClose={closeModal} payload={payload} />;
    default:
      return null; // неизвестная модалка
  }
}
