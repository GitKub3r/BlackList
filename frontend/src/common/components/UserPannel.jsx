import "../../styles/components/User-Pannel.css";
import "../../styles/layouts/User-Form-Layout.css";

import { UserPannelInput } from "./pannel/UserPannelInput";
import messages from "../json/account/error-messages.json";

export const UserPannel = ({ data = {} }) => {
    let error = false;

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
                alert("No se realizaron cambios, los datos son iguales."); // O actualizar UI de otra forma
            } else if (response.ok) {
                window.location.reload();
            } else {
                console.error("Error changing user data");
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
    );
};
