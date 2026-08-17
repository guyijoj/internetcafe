"use client";

import { RestaurantsModalPayload } from "../../../../types/restaurants";
import { Restaurants } from "../../Restaurants/Restaurants";
import { ModalBase } from "../ModalBase";

export type RestaurantsModalProps = {
  onClose: () => void;
  payload: RestaurantsModalPayload;
};

export function RestaurantsModal({ onClose, payload }: RestaurantsModalProps) {
  return (
    <ModalBase id="restaurants" title="Наши рестораны" onClose={onClose}>
      <Restaurants onClose={onClose} goBack={payload.fromCheckout} />
    </ModalBase>
  );
}
