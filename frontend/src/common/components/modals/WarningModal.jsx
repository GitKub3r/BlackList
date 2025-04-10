import "../../../styles/components/Modal.css";
import { useEffect, useState } from "react";

export const WarningModal = ({ message }) => {
    const [visible, setVisible] = useState(false);
    const delay = 25;

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, delay); // Small delay to ensure animation starts smoothly

        const autoCloseTimer = setTimeout(() => {
            setVisible(false);
        }, 3000 + delay); // Auto-close after 3 seconds (including delay)

        return () => {
            clearTimeout(timer);
            clearTimeout(autoCloseTimer);
        };
    }, []);

    return (
        <div
            className={`modal ${visible ? "visible" : ""}`}
            style={{ backgroundColor: "var(--color-warning-modal-bg)" }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                style={{ fill: "var(--color-warning-modal-alt)" }}
            >
                <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z" />
            </svg>

            <p style={{ color: "var(--color-warning-modal-alt)" }}>{message}</p>
        </div>
    );
};
