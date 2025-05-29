import "../../styles/components/User-Pannel.css";
import "../../styles/layouts/User-Form-Layout.css";
import { UserPannelInput } from "./pannel/UserPannelInput";
import messages from "../json/account/error-messages.json";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useModal } from "../auth/ModalContext";

export const UserPannel = ({ data = {} }) => {
  let error = false;
  const { apiURL, token } = useAuth();
  const { showModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = document.getElementById("change-username-input");
    const email = document.getElementById("change-email-input");
    const password = document.getElementById("change-password-input");

    handleValidation(username, email, password);

    if (!error) {
      const object = {
        id: data.id,
        username: username.value,
        email: email.value,
        password: password.value,
      };

      console.log(object);

      const response = await fetch(`${apiURL}/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(object),
      });

      if (response.status === 204) {
        showModal(messages.warning, "warning");
      } else if (response.ok) {
        showModal(messages.success, "success");
        setTimeout(() => window.location.reload(), 3500);
      } else {
        showModal(messages.error, "error");
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
      showModal("All fields are required", "warning");
      error = true;
    } else {
      error = false;
    }
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
        />

        <button type="submit">Change Data</button>
      </div>
    </form>
  );
};
