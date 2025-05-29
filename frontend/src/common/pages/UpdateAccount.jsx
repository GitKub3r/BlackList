import "../../styles/pages/Create-Account.css";
import { CustomSelect } from "../components/CustomSelect";
import userTypes from "../json/users/user-types.json";
import messages from "../json/users/error-messages.json";
import { useState } from "react";
import { LoginInput } from "../components/form/LoginInput";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { useModal } from "../auth/ModalContext";

export const UpdateAccount = () => {
  const navigate = useNavigate();
  let error = false;
  const { apiURL, user: authUser } = useAuth();
  const { showModal } = useModal();
  const location = useLocation();
  const userToEdit = location.state?.user || null;

  // Solo permitir acceso a ADMIN
  if (!authUser || authUser.type !== "ADMIN") {
    navigate("/");
    return <div>Unauthorized</div>;
  }

  if (userToEdit === null) {
    navigate("/users");
    return <div>An error has occurred</div>;
  }

  const [selectedType, setSelectedType] = useState(userTypes[0]);

  const formatUserType = (type) => {
    const firstLetter = type.charAt(0).toUpperCase();
    const restOfString = type.slice(1).toLowerCase();
    return firstLetter + restOfString;
  };

  const userType = formatUserType(userToEdit.type);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = document.getElementById("create-username-input");
    const email = document.getElementById("create-email-input");
    const password = document.getElementById("create-password-input");
    const type = selectedType;

    handleValidation(username, email, password);

    if (!error) {
      const fetchedUser = {
        id: userToEdit.id,
        username: username.value,
        email: email.value,
        password: password.value,
        type: type.toUpperCase(),
      };

      try {
        const response = await fetch(`${apiURL}/users/modify`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fetchedUser),
        });

        if (response.ok) {
          showModal(
            messages["modify-success"] || "User updated successfully",
            "success"
          );
          navigate("/users");
        } else {
          let msg = messages.error;
          try {
            const data = await response.json();
            if (data && data.message) msg = data.message;
          } catch {}
          showModal(msg || messages.unknown, "error");
        }
      } catch (error) {
        showModal(messages.unknown, "error");
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
      showModal(messages.empty, "warning");
    } else {
      error = false;
    }
  };

  return (
    <div className="create-account-page">
      <form onSubmit={handleSubmit} className="create-account-form">
        <div className="create-account-text-container">
          <h1>Modify {userToEdit.username}'s account</h1>
          <hr />
        </div>

        <div className="create-account-inputs-container">
          <LoginInput
            label="Username"
            type="text"
            name="create-username"
            id="create-username-input"
            value={userToEdit.username}
          />
          <LoginInput
            label="Email"
            type="email"
            name="create-email"
            id="create-email-input"
            value={userToEdit.email}
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
            value={userType}
          />
        </div>

        <button>Modify Account</button>
      </form>
    </div>
  );
};
