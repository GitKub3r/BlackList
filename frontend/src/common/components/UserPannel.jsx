import "../../styles/components/User-Pannel.css";
import "../../styles/layouts/User-Form-Layout.css";

import { UserPannelInput } from "./pannel/UserPannelInput";
import messages from "../json/account/error-messages.json";
import { SuccessModal } from "./modals/SuccessModal";
import { ErrorModal } from "./modals/ErrorModal";
import { useState } from "react";
import { WarningModal } from "./modals/WarningModal";
export const UserPannel = ({ data = {} }) => {
    let error = false;
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [warningMessage, setWarningMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = document.getElementById("change-username-input");
        const email = document.getElementById("change-email-input");
        const password = document.getElementById("change-password-input");

        handleValidation(username, email, password);

        if (!error) {
            const token = localStorage.getItem("token");
            const object = {
                id: data.id,
                username: username.value,
                email: email.value,
                password: password.value,
            };

            const response = await fetch(`http://localhost:8080/api/users`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(object),
            });

            if (response.status === 204) {
                setWarningMessage(messages.warning);
                setShowWarningModal(false); // Reset modal visibility
                setTimeout(() => {
                    setShowWarningModal(true); // Trigger re-render
                }, 10);
            } else if (response.ok) {
                setSuccessMessage(messages.success);
                setShowSuccessModal(false); // Reset modal visibility
                setTimeout(() => {
                    setShowSuccessModal(true); // Trigger re-render
                }, 10);
                setTimeout(() => window.location.reload(), 3500);
            } else {
                setErrorMessage(messages.error);
                setShowErrorModal(false); // Reset modal visibility
                setTimeout(() => {
                    setShowErrorModal(true); // Trigger re-render
                }, 10);
            }
        }
    };

    const handleValidation = (username, email, password) => {
        let nErrors = 0;

        if (username.value === "") {
            nErrors++;
        }

        if (email.value === "") {
            nErrors++;
        }

        if (password.value === "") {
            nErrors++;
        }

        if (nErrors > 0) {
            setShowErrorModal(false); // Reset modal visibility
            setErrorMessage("All fields are required");
            setTimeout(() => {
                setShowErrorModal(true);
            }, 0); // Ensure modal re-renders
            error = true;
        }
    };

    const showError = (element, message) => {
        element.classList.add("error");
        element.previousSibling.classList.add("error");
        element.placeholder = message;
        element.value = "";
    };

    return (
        <>
            {showSuccessModal && (
                <SuccessModal key={successMessage} message={successMessage} />
            )}
            {showErrorModal && (
                <ErrorModal key={errorMessage} message={errorMessage} />
            )}
            {showWarningModal && (
                <WarningModal key={warningMessage} message={warningMessage} />
            )}
            <form onSubmit={handleSubmit} className="user-pannel">
                <div>
                    <h1>Modify your account</h1>
                    <hr />
                </div>
                <div className="user-pannel-layout">
                    <UserPannelInput
                        label="Username"
                        type="text"
                        name="change-username"
                        id="change-username-input"
                        value={data.username}
                    />

                    <UserPannelInput
                        label="Email"
                        type="email"
                        name="change-email"
                        id="change-email-input"
                        value={data.email}
                    />

                    <UserPannelInput
                        label="Password"
                        type="password"
                        name="change-password"
                        id="change-password-input"
                        className="user-pannel-input password"
                        value={data.password}
                    />

                    <button type="submit">Change Data</button>
                </div>
            </form>
        </>
    );
};
