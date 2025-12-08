"use client";

import { Restaurants } from "../../Restaurants/Restaurants";
import { ModalBase } from "../ModalBase";

export function RestaurantsModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalBase id="restaurants" title="Наши рестораны" onClose={onClose}>
      <Restaurants />
    </ModalBase>
  );
}
