import "../../styles/pages/Users.css";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { GridCardLayout } from "../layouts/GridCardLayout";
import { AccountCard } from "../components/AccountCard";
import { Link } from "react-router";
import { ErrorModal } from "../components/modals/ErrorModal";
import messages from "../json/users/error-messages.json";

export const Users = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const { isAuthenticated } = useAuth();
    const userID = token ? jwtDecode(token).sub : null;
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        checkUserType();
        const fetchHosters = async () => {
            if (token) {
                const response = await fetch(
                    "http://localhost:8080/api/users",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        method: "GET",
                    }
                );

                const data = await response.json();

                if (response.status === 404) {
                    console.error("Error fetching hosters:", data);
                } else if (response.ok) {
                    const sortedData = data.sort((a, b) => {
                        if (a.type === b.type) {
                            return a.username.localeCompare(b.username);
                        }
                        return a.type === "ADMIN" ? -1 : 1;
                    });
                    setUsers(sortedData);
                }
            } else {
                navigate("/login");
            }
        };

        fetchHosters();
    }, [isAuthenticated]);

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
            showError(messages.unknown);
        } else if (response.ok) {
            if (data.type !== "ADMIN") {
                navigate("/");
            }
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
        <div className="accounts-page">
            {showErrorModal && <ErrorModal message={errorMessage} />}
            <Link className="create-account" to="/create-account">
                <button>Create New Account</button>
            </Link>

            <GridCardLayout>
                {users.map((user) => (
                    <AccountCard
                        key={user.id}
                        user={user}
                        disabled={user.id == userID}
                    />
                ))}
            </GridCardLayout>
        </div>
    );
};
