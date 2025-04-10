import "../../styles/pages/Create-Account.css";
import { CustomSelect } from "../components/CustomSelect";
import userTypes from "../json/users/user-types.json";
import messages from "../json/users/error-messages.json";
import { useState, useEffect } from "react";
import { LoginInput } from "../components/form/LoginInput";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import jwtDecode from "jwt-decode";
import { ErrorModal } from "../components/modals/ErrorModal";

export const UpdateAccount = () => {
    const navigate = useNavigate();
    let error = false;
    const token = localStorage.getItem("token");
    const userID = token ? jwtDecode(token).sub : null;
    const location = useLocation();
    const user = location.state?.user || null;
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    if (user === null) {
        navigate("/users");
        return <div>An error has occurred</div>;
    }

    const [selectedType, setSelectedType] = useState(userTypes[0]);

    const formatUserType = (type) => {
        const firstLetter = type.charAt(0).toUpperCase();
        const restOfString = type.slice(1).toLowerCase();
        return firstLetter + restOfString;
    };

    const userType = formatUserType(user.type);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = document.getElementById("create-username-input");
        const email = document.getElementById("create-email-input");
        const password = document.getElementById("create-password-input");
        const type = selectedType;

        handleValidation(username, email, password);

        if (!error) {
            const fetchedUser = {
                id: user.id,
                username: username.value,
                email: email.value,
                password: password.value,
                type: type.toUpperCase(),
            };

            try {
                const response = await fetch(
                    "http://localhost:8080/api/users/modify",
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(fetchedUser),
                    }
                );

                if (response.ok) {
                    navigate("/users");
                }
            } catch (error) {
                console.error("Error modifying user:", error);
                showError(messages.unknown);
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
            error = true;
            showError(messages.empty);
        } else {
            error = false;
        }
    };

    const showError = (message) => {
        setErrorMessage(message);
        setShowErrorModal(false);
        setTimeout(() => {
            setShowErrorModal(true);
        }, 10);
    };

    const checkUserType = async () => {
        const response = await fetch(
            `http://localhost:8080/api/users/${userID}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: "GET",
            }
        );

        const data = await response.json();

        if (response.status === 404) {
            console.error("Error fetching user type:", data);
        } else if (response.ok) {
            if (data.type !== "ADMIN") {
                navigate("/");
            }
        }
    };

    checkUserType();

    return (
        <div className="create-account-page">
            {showErrorModal && <ErrorModal message={errorMessage} />}
            <form onSubmit={handleSubmit} className="create-account-form">
                <div className="create-account-text-container">
                    <h1>Modify {user.username}'s account</h1>
                    <hr />
                </div>

                <div className="create-account-inputs-container">
                    <LoginInput
                        label="Username"
                        type="text"
                        name="create-username"
                        id="create-username-input"
                        value={user.username}
                    />
                    <LoginInput
                        label="Email"
                        type="email"
                        name="create-email"
                        id="create-email-input"
                        value={user.email}
                    />
                    <LoginInput
                        label="Password"
                        type="password"
                        name="create-password"
                        id="create-password-input"
                        value={user.password}
                    />

                    <CustomSelect
                        label="Account Type"
                        options={userTypes}
                        onChange={setSelectedType}
                        value={userType}
                    />
                </div>

                <button>Modify Account</button>
            </form>
        </div>
    );
};
