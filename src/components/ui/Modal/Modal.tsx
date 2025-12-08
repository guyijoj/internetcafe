"use client";

import { ReactNode, useEffect, useRef } from "react";
import styles from "./Modal.module.css";

type ModalProps = {
  id?: string;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal = ({ id, title, isOpen, onClose, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFocusable = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && firstFocusable.current) {
      firstFocusable.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={styles.overlay}
      onMouseDown={onOverlayClick}
      role="presentation"
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? `${id}-title` : undefined}
        id={id}
        ref={dialogRef}
      >
        <div className={styles.header}>
          {title && (
            <h2 id={title ? `${id}-title` : undefined} className={styles.title}>
              {title}
            </h2>
          )}
          <button
            ref={firstFocusable}
            className={styles.close}
            onClick={onClose}
            aria-label="Закрыть диалог"
            type="button"
          >
            ×
          </button>
        </div>

        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};
