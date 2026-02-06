import React from "react";
import { ModalBase } from "../ModalBase";
import Checkout from "../../Checkout/Checkout";

export type CheckoutProps = {
  total: number;
};

const CheckoutModal = ({
  onClose,
  payload,
}: {
  onClose: () => void;
  payload: CheckoutProps;
}) => {
  return (
    <ModalBase id="Checkout" title="Оформление" onClose={onClose}>
      <Checkout total={payload.total} />
    </ModalBase>
  );
};

export default CheckoutModal;
