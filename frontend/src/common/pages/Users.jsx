import "../../styles/pages/Users.css";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { GridCardLayout } from "../layouts/GridCardLayout";
import { AccountCard } from "../components/AccountCard";
import { Link } from "react-router";

export const Users = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const { isAuthenticated } = useAuth();
    const userID = token ? jwtDecode(token).sub : null;

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
        } else if (response.ok) {
            if (data.type !== "ADMIN") {
                navigate("/");
            }
        }
    };

    return (
        <div className="accounts-page">
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
