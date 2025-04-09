import "../../../styles/components/Modal.css";
import { useEffect, useState } from "react";

export const SuccessModal = ({ message }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 10); // Small delay to ensure animation starts smoothly

        const autoCloseTimer = setTimeout(() => {
            setVisible(false);
        }, 3010); // Auto-close after 3 seconds (including delay)

        return () => {
            clearTimeout(timer);
            clearTimeout(autoCloseTimer);
        };
    }, []);

    return (
        <div
            className={`modal ${visible ? "visible" : ""}`}
            style={{ backgroundColor: "var(--color-success-modal-bg)" }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                style={{ fill: "var(--color-success-modal-alt)" }}
            >
                <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>

            <p style={{ color: "var(--color-success-modal-alt)" }}>{message}</p>
        </div>
    );
};
