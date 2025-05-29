import { useAuth } from "../auth/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { UserCard } from "../components/UserCard";
import "../../styles/pages/Account.css";
import { UserPannel } from "../components/UserPannel";
import { ChampionBanPannel } from "../components/ChampionBanPannel";

export const Account = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate("/login");
    }
  }, [isAuthenticated, user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="account-page">
      <div className="wrapper">
        <UserCard user={user} />
        <UserPannel data={user} />
      </div>

      <div className="wrapper">
        <ChampionBanPannel />
      </div>
    </div>
  );
};
