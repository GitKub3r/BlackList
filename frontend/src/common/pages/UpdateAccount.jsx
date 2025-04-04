import "../../styles/pages/Create-Account.css";
import { CustomSelect } from "../components/CustomSelect";
import userTypes from "../json/users/user-types.json";
import messages from "../json/users/error-messages.json";
import { useState } from "react";
import { LoginInput } from "../components/form/LoginInput";
import { useNavigate } from "react-router";
import jwtDecode from "jwt-decode";

export const UpdateAccount = ({ user }) => {
    const navigate = useNavigate();
    let error = false;
    const token = localStorage.getItem("token");
    const userID = token ? jwtDecode(token).sub : null;

    const [selectedType, setSelectedType] = useState(userTypes[0]);

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

    const handleValidation = (username, email, password, type) => {
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
        } else {
            error = false;
        }
    };

    const showError = (input, message) => {
        input.classList.add("error");
        input.previousSibling.classList.add("error");
        input.placeholder = message;
        input.value = "";
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
            <form onSubmit={handleSubmit} className="create-account-form">
                <div className="create-account-text-container">
                    <h1>Modify {user.username} the account</h1>
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
