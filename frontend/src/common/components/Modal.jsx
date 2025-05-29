import "../../styles/components/Modal.css";
import { useEffect, useState } from "react";

const modalStyles = {
  error: {
    bg: "var(--color-error-modal-bg)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="var(--color-error-modal-alt)"
      >
        <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
      </svg>
    ),
  },
  success: {
    bg: "var(--color-success-modal-bg)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="var(--color-success-modal-alt)"
      >
        <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
      </svg>
    ),
  },
  info: {
    bg: "var(--color-info-modal-bg)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="var(--color-info-modal-alt)"
      >
        <path d="M480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-200v-80h320v80H320Zm10-120q-69-41-109.5-110T180-580q0-125 87.5-212.5T480-880q125 0 212.5 87.5T780-580q0 81-40.5 150T630-320H330Zm24-80h252q45-32 69.5-79T700-580q0-92-64-156t-156-64q-92 0-156 64t-64 156q0 54 24.5 101t69.5 79Zm126 0Z" />
      </svg>
    ),
  },
  warning: {
    bg: "var(--color-warning-modal-bg)",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="var(--color-warning-modal-alt)"
      >
        <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z" />
      </svg>
    ),
  },
};

export const Modal = ({ message, type = "info" }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    const autoCloseTimer = setTimeout(() => setVisible(false), 3010);
    return () => {
      clearTimeout(timer);
      clearTimeout(autoCloseTimer);
    };
  }, [message, type]);

  const style = modalStyles[type] || modalStyles.info;

  return (
    <div
      className={`modal ${visible ? "visible" : ""}`}
      style={{
        borderColor: ` ${style.bg}`,
      }}
    >
      <span>{style.icon}</span>
      <p>{message}</p>
    </div>
  );
};
