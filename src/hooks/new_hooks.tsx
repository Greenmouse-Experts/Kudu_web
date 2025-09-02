import { useRef } from "react";

export const useReModal = () => {
  const modalRef = useRef<{ open: () => void; close: () => void }>(null);

  const openModal = () => modalRef.current?.open();
  const closeModal = () => modalRef.current?.close();

  return { modalRef, openModal, closeModal };
};
