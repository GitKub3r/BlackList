import "../../styles/components/User-Card.css";
import Image from "../../../public/assets/images/BlackList-Logo.png";
import { useAuth } from "../auth/AuthContext";

export const UserCard = ({ user }) => {
  const { logout } = useAuth();

  return (
    <div className="user-card">
      <img src={Image} alt="blacklist-logo" />
      <hr />
      <div className="user-data">
        <h1>{user.username}</h1>
        <p>{user.type}</p>
      </div>

      <button onClick={logout}>Log out</button>
    </div>
  );
};
