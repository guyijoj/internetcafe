"use client";

import { Vacancy } from "../../Vacancies/Vacancy";
import { ModalBase } from "../ModalBase";

type Props = {
  onClose: () => void;
  payload?: unknown; // сюда можно прокидывать данные при openModal('jobs', payload)
};

export function JobsModal({ onClose }: Props) {
  return (
    <ModalBase id="jobs" title="Работа у нас" onClose={onClose}>
      <Vacancy />
    </ModalBase>
  );
}
