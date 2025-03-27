import "../../styles/components/User-Card.css";
import Image from "../../../public/assets/images/BlackList-Logo.png";

export const UserCard = ({ user }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="user-card">
      <img src={Image} alt="blacklist-logo" />
      <hr />
      <div className="user-data">
        <h1>{user.username}</h1>
        <p>{user.type}</p>
      </div>

      <button onClick={handleLogout}>Log out</button>
    </div>
  );
};
