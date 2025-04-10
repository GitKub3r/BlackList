import "../../styles/pages/Create-Account.css";
import { CustomSelect } from "../components/CustomSelect";
import userTypes from "../json/users/user-types.json";
import messages from "../json/users/error-messages.json";
import { useEffect, useState } from "react";
import { LoginInput } from "../components/form/LoginInput";
import { useNavigate } from "react-router";
import jwtDecode from "jwt-decode";
import { ErrorModal } from "../components/modals/ErrorModal";

export const CreateAccount = () => {
    const navigate = useNavigate();
    let error = false;
    const token = localStorage.getItem("token");
    const userID = token ? jwtDecode(token).sub : null;

    const [selectedType, setSelectedType] = useState(userTypes[0]);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = document.getElementById("create-username-input");
        const email = document.getElementById("create-email-input");
        const password = document.getElementById("create-password-input");
        const type = selectedType;

        handleValidation(username, email, password);

        if (!error) {
            const user = {
                username: username.value,
                email: email.value,
                password: password.value,
                type: type,
            };

            const response = await fetch(
                "http://localhost:8080/api/users/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(user),
                }
            );

            if (response.ok) {
                navigate("/users");
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

        if (response.status === 404 || response.status === 400) {
            console.error("Error fetching user type:", data);
        } else if (response.ok) {
            if (data.type !== "ADMIN") {
                navigate("/");
            }
        }
    };

    useEffect(() => {
        if (token) {
            checkUserType();
        } else {
            navigate("/login");
        }
    }, []);

    return (
        <div className="create-account-page">
            {showErrorModal && <ErrorModal message={errorMessage} />}
            <form onSubmit={handleSubmit} className="create-account-form">
                <div className="create-account-text-container">
                    <h1>Create a new account</h1>
                    <hr />
                </div>

                <div className="create-account-inputs-container">
                    <LoginInput
                        label="Username"
                        type="text"
                        name="create-username"
                        id="create-username-input"
                    />
                    <LoginInput
                        label="Email"
                        type="email"
                        name="create-email"
                        id="create-email-input"
                    />
                    <LoginInput
                        label="Password"
                        type="password"
                        name="create-password"
                        id="create-password-input"
                    />

                    <CustomSelect
                        label="Account Type"
                        options={userTypes}
                        onChange={setSelectedType}
                    />
                </div>

                <button>Create Account</button>
            </form>
        </div>
    );
};
