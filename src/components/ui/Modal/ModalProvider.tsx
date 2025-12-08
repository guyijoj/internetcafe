import React, { createContext, useCallback, useMemo, useState } from "react";

type ModalId = string | null;
type ModalPayload = unknown;
type ModalContextValue = {
  openModal: (id: string, payload?: ModalPayload) => void;
  closeModal: () => void;
  modalId: ModalId;
  payload: ModalPayload;
};

export const ModalContext = createContext<ModalContextValue>({
  openModal: () => {},
  closeModal: () => {},
  modalId: null,
  payload: null,
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalId, setModalId] = useState<ModalId>(null);
  const [payload, setPayload] = useState<ModalPayload>(null);

  const openModal = useCallback((id: string, p?: ModalPayload) => {
    setModalId(id);
    setPayload(p ?? null);
  }, []);

  const closeModal = useCallback(() => {
    setModalId(null);
    setPayload(null);
  }, []);
  const value = useMemo(
    () => ({ openModal, closeModal, modalId, payload }),
    [openModal, closeModal, modalId, payload]
  );
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
