import "../../styles/pages/Login.css";
import { LoginButton } from "../components/form/LoginButton";
import { LoginInput } from "../components/form/LoginInput";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import messages from "../json/login/error-messages.json";
import { ErrorModal } from "../components/modals/ErrorModal";
import { useState } from "react";

export const Login = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorModal, setShowErrorModal] = useState(false);
    let error = false;

    const handleLogin = async (e) => {
        e.preventDefault();

        const username = document.getElementById("username-input");
        const password = document.getElementById("password-input");

        handleValidation(username, password);

        if (!error) {
            const response = await fetch(
                "http://localhost:8080/api/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username.value,
                        password: password.value,
                    }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                setIsAuthenticated(true);
                navigate("/");
            } else {
                showError(messages.invalid);
                username.value = "";
                password.value = "";
            }
        }
    };

    const handleValidation = (username, password) => {
        let nErrors = 0;

        if (username.value === "") {
            nErrors++;
        }

        if (password.value === "") {
            nErrors++;
        }

        if (nErrors > 0) {
            showError(messages.empty);
            error = true;
        } else {
            error = false;
        }
    };

    const showError = (message) => {
        setErrorMessage(message);
        setShowErrorModal(false); // Reset modal visibility
        setTimeout(() => {
            setShowErrorModal(true); // Trigger re-render
        }, 10);
    };

    return (
        <section className="login-page center-column">
            {showErrorModal && <ErrorModal message={errorMessage} />}
            <form className="login-form" onSubmit={handleLogin}>
                <LoginInput
                    label="Username"
                    type="text"
                    name="username"
                    id="username-input"
                />

                <LoginInput
                    label="Password"
                    type="password"
                    name="password"
                    id="password-input"
                />

                <span className="login-page-info">
                    Don't have a <b>hoster account</b>? Check our{" "}
                    <Link>about</Link> page
                </span>

                <LoginButton />
            </form>
        </section>
    );
};
