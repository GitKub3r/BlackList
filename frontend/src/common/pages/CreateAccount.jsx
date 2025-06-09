import "../../styles/pages/Create-Account.css";
import { CustomSelect } from "../components/CustomSelect";
import userTypes from "../json/users/user-types.json";
import messages from "../json/users/error-messages.json";
import { useEffect, useState } from "react";
import { LoginInput } from "../components/form/LoginInput";
import { useNavigate } from "react-router";
import jwtDecode from "jwt-decode";
import { useModal } from "../auth/ModalContext";
import { useAuth } from "../auth/AuthContext";

export const CreateAccount = () => {
  const navigate = useNavigate();
  let error = false;
  const token = localStorage.getItem("token");

  const [selectedType, setSelectedType] = useState(userTypes[0]);
  const { apiURL, user } = useAuth();
  const { showModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = document.getElementById("create-username-input");
    const email = document.getElementById("create-email-input");
    const password = document.getElementById("create-password-input");
    const type = selectedType;

    handleValidation(username, email, password);

    if (!error) {
      const userObj = {
        username: username.value,
        email: email.value,
        password: password.value,
        type: type, // El backend espera "type"
      };

      const response = await fetch(`${apiURL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userObj),
      });

      if (response.ok) {
        showModal("Account created successfully", "success");
        navigate("/users");
      } else {
        let msg = "Error creating account";
        try {
          const data = await response.json();
          if (data && data.message) msg = data.message;
        } catch {}
        showModal(msg, "error");
      }
    }
  };

  const handleValidation = (username, email, password) => {
    let nErrors = 0;

    if (username.value === "") nErrors++;
    if (email.value === "") nErrors++;
    if (password.value === "") nErrors++;

    if (nErrors > 0) {
      error = true;
      showModal(messages.empty, "warning");
    } else {
      error = false;
    }
  };

  const checkUserType = async () => {
    const response = await fetch(`${apiURL}/users/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });

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
    // eslint-disable-next-line
  }, []);

  return (
    <div className="create-account-page">
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
            required
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
            required
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
