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
    const [infoMessage, setInfoMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("WARNING MODAL STATE: ", showWarningModal);

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
                setShowWarningModal(false); // Reset modal visibility
                setTimeout(() => {
                    setInfoMessage("No changes were made");
                    setShowWarningModal(true);
                }, 0); // Ensure modal re-renders
            } else if (response.ok) {
                setShowSuccessModal(false); // Reset modal visibility
                setTimeout(() => {
                    setShowSuccessModal(true);
                }, 0); // Ensure modal re-renders
            } else {
                setShowErrorModal(false); // Reset modal visibility
                setTimeout(() => {
                    setShowErrorModal(true);
                }, 0); // Ensure modal re-renders
            }
        }
    };

    const handleValidation = (username, email, password) => {
        let nErrors = 0;

        if (username.value === "") {
            nErrors++;
            showError(username, messages.empty.username);
        }

        if (email.value === "") {
            nErrors++;
            showError(email, messages.empty.email);
        }

        if (password.value === "") {
            nErrors++;
            showError(password, messages.empty.password);
        }

        if (nErrors > 0) {
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
                <SuccessModal message="Data updated successfully!" />
            )}
            {showErrorModal && <ErrorModal message="Error updating data!" />}
            {showWarningModal && <WarningModal message={infoMessage} />}
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
