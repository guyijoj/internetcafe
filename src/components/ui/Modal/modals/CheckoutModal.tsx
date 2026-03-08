import React from "react";
import { ModalBase } from "../ModalBase";
import Checkout from "../../Checkout/Checkout";

export type CheckoutProps = {
  total: number;
};

const CheckoutModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <ModalBase id="Checkout" title="Оформление" onClose={onClose}>
      <Checkout />
    </ModalBase>
  );
};

export default CheckoutModal;
