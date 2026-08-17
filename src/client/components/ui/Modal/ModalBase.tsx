"use client";

import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

type Props = {
  title?: string;
  onClose: () => void;
  children: ReactNode;
  id?: string;
};

export function ModalBase({ title, onClose, children, id }: Props) {
  const firstFocusable = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    firstFocusable.current?.focus();
  }, []);

  const body = (
    <div
      className={styles.overlay}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? `${id}-title` : undefined}
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
            aria-label="Закрыть"
            type="button"
          >
            ×
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );

  return createPortal(body, document.body);
}
