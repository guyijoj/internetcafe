"use client";

import { useModal } from "./useModal";
import { RestaurantsModal } from "./modals/RestaurantsModal";
import { JobsModal } from "./modals/JobsModal";
import { BasketMobileModal } from "./modals/MobileBasketModal";

import CheckoutModal, { CheckoutProps } from "./modals/CheckoutModal";
import { RestaurantsModalPayload } from "../../../types/restaurants";

/**
 * Здесь “регистрируем” все модалки по id.
 * Хочешь добавить новую — создай компонент и добавь ветку в switch.
 */
export function ModalRoot() {
  const { modalId, payload, closeModal } = useModal();

  if (!modalId) return null;

  switch (modalId) {
    case "restaurants":
      return (
        <RestaurantsModal
          onClose={closeModal}
          payload={payload as RestaurantsModalPayload}
        />
      );
    case "jobs":
      return <JobsModal onClose={closeModal} payload={payload} />;
    case "mobileBasket":
      return <BasketMobileModal onClose={closeModal} payload={payload} />;
    case "checkout":
      return <CheckoutModal onClose={closeModal} />;
    default:
      return null; // неизвестная модалка
  }
}
