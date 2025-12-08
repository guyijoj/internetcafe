"use client";

import { useContext } from "react";
import { ModalContext } from "./ModalProvider";

export const useModal = () => useContext(ModalContext);
