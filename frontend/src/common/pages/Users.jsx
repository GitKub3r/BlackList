import "../../styles/pages/Users.css";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";
import { GridCardLayout } from "../layouts/GridCardLayout";
import { AccountCard } from "../components/AccountCard";
import { Link } from "react-router";
import { useModal } from "../auth/ModalContext";
import messages from "../json/users/error-messages.json";
import { ConfirmModal } from "../components/ConfirmModal";

export const Users = () => {
  const navigate = useNavigate();
  const { isAuthenticated, apiURL, user, token } = useAuth();
  const { showModal } = useModal();
  const [users, setUsers] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userToRemove, setUserToRemove] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || !user || user.type !== "ADMIN") {
      navigate("/");
      return;
    }

    const fetchHosters = async () => {
      const response = await fetch(`${apiURL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });

      const data = await response.json();

      if (response.status === 404) {
        showModal(messages["not-found"], "error");
      } else if (response.ok) {
        const sortedData = data.sort((a, b) => {
          if (a.type === b.type) {
            return a.username.localeCompare(b.username);
          }
          return a.type === "ADMIN" ? -1 : 1;
        });
        setUsers(sortedData);
      } else {
        showModal(messages.error, "error");
      }
    };

    fetchHosters();
  }, [isAuthenticated, user, apiURL, token, navigate, showModal]);

  if (!isAuthenticated || !user || user.type !== "ADMIN") {
    return null;
  }

  const handleAskRemove = (id) => {
    setUserToRemove(id);
    setConfirmOpen(true);
  };

  // El borrado real solo ocurre tras confirmar en el modal
  const handleRemove = async (id) => {
    try {
      const response = await fetch(`${apiURL}/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
        showModal(
          messages["remove-success"] || "User removed successfully",
          "success"
        );
      } else {
        showModal(messages.error || "Failed to remove user", "error");
      }
    } catch (error) {
      showModal(
        messages.error || "An error occurred while removing the user",
        "error"
      );
    }
    setConfirmOpen(false);
    setUserToRemove(null);
  };

  const handleConfirmResult = (result) => {
    setConfirmOpen(false);
    if (result && userToRemove) {
      handleRemove(userToRemove);
    } else {
      setUserToRemove(null);
    }
  };

  return (
    <div className="accounts-page">
      <Link className="create-account" to="/create-account">
        <button>Create New Account</button>
      </Link>

      <GridCardLayout>
        {users.map((u) => (
          <AccountCard
            key={u.id}
            user={u}
            disabled={u.id === user.id}
            onRemove={() => handleAskRemove(u.id)}
          />
        ))}
      </GridCardLayout>

      <ConfirmModal
        open={confirmOpen}
        title="Delete user"
        description="Are you sure you want to delete this user? This action cannot be undone."
        onResult={handleConfirmResult}
        confirmText="Delet Account"
        cancelText="Cancel"
      />
    </div>
  );
};
