"use client";

import BasketMobile from "../../Basket/BasketMobile";

import { ModalBase } from "../ModalBase";

type Props = {
  onClose: () => void;
  payload?: unknown;
};

export function BasketMobileModal({ onClose }: Props) {
  return (
    <ModalBase id="mobileBasket" title="Ваш заказ" onClose={onClose}>
      <BasketMobile />
    </ModalBase>
  );
}
