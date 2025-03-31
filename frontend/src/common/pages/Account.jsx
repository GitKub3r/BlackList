import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import jwtDecode from "jwt-decode"; // Correct import for jwt-decode
import { UserCard } from "../components/UserCard";
import "../../styles/pages/Account.css";
import { UserPannel } from "../components/UserPannel";

export const Account = () => {
  const navigate = useNavigate();
  const { username, isAuthenticated } = useAuth();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decoded = jwtDecode(token);
          const tokenID = decoded.sub;

          const response = await fetch(
            `http://localhost:8080/api/users/${tokenID}`
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
      } else {
        navigate("/login");
      }
    };

    fetchUserData();
  }, [isAuthenticated]);

  return (
    <div className="account-page">
      <UserCard user={userData} />
      <UserPannel data={userData} />
    </div>
  );
};
