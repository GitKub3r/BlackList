import "../../../styles/components/Modal.css";
import { useEffect, useState } from "react";

export const ErrorModal = ({ message }) => {
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
            style={{ backgroundColor: "var(--color-error-modal-bg)" }}
        >
            <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 52 52"
                xml:space="preserve"
                style={{
                    fill: "var(--color-error-modal-alt)",
                    overflow: "visible",
                }}
            >
                <g stroke="var(--color-error-modal-alt)" stroke-width="2">
                    <path
                        d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26
		S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z"
                    />
                    <path
                        d="M35.707,16.293c-0.391-0.391-1.023-0.391-1.414,0L26,24.586l-8.293-8.293c-0.391-0.391-1.023-0.391-1.414,0
		s-0.391,1.023,0,1.414L24.586,26l-8.293,8.293c-0.391,0.391-0.391,1.023,0,1.414C16.488,35.902,16.744,36,17,36
		s0.512-0.098,0.707-0.293L26,27.414l8.293,8.293C34.488,35.902,34.744,36,35,36s0.512-0.098,0.707-0.293
		c0.391-0.391,0.391-1.023,0-1.414L27.414,26l8.293-8.293C36.098,17.316,36.098,16.684,35.707,16.293z"
                    />
                </g>
            </svg>

            <p style={{ color: "var(--color-error-modal-alt)" }}>{message}</p>
        </div>
    );
};
