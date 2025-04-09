import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import jwtDecode from "jwt-decode";
import { UserCard } from "../components/UserCard";
import "../../styles/pages/Account.css";
import { UserPannel } from "../components/UserPannel";
import { ChampionBanPannel } from "../components/ChampionBanPannel";

export const Account = () => {
    const navigate = useNavigate();
    const { username, isAuthenticated } = useAuth();
    const [userData, setUserData] = useState({});
    const token = localStorage.getItem("token");

    const fetchUserData = async () => {
        try {
            const userID = jwtDecode(token).sub;

            const response = await fetch(
                `http://localhost:8080/api/users/${userID}`
            );

            const data = await response.json();

            setUserData({
                id: data.id || "N/A",
                username: data.username || "N/A",
                email: data.email || "N/A",
                password: data.password || "N/A",
                type: data.type || "N/A",
            });
        } catch (error) {
            console.error("Error fetching user data or decoding token:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchUserData();
        } else {
            navigate("/login");
        }
    }, []);

    return (
        <div className="account-page">
            <div className="wrapper">
                <UserCard user={userData} />
                <UserPannel data={userData} />
            </div>

            <div className="wrapper">
                <ChampionBanPannel />
            </div>
        </div>
    );
};
