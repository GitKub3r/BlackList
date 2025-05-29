import "../../styles/components/Account-Card.css";
import image from "../../../public/assets/images/BlackList-Logo.png";
import edit from "../../../public/assets/icons/hosters.svg";
import remove from "../../../public/assets/icons/delete.svg";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { useEffect, useState } from "react";

export const AccountCard = ({ user, disabled = false, onRemove }) => {
  const navigate = useNavigate();
  const [usernameTemplate, setUsernameTemplate] = useState(user.username);

  useEffect(() => {
    const nCharacters = 11;
    if (user.username.length > nCharacters) {
      const firstPart = user.username.slice(0, nCharacters);
      setUsernameTemplate(`${firstPart}...`);
    }
  }, [user.username]);

  return (
    <div className="account-card">
      <img src={image} alt="account-image" className="account-card-img" />

      <div className="account-info-actions">
        <div className="account-info">
          <h2>{usernameTemplate}</h2>
          <p>{user.type}</p>
        </div>

        <hr />

        <div className="account-actions">
          <Link to="/update-account" state={{ user }}>
            <button className="edit-account" disabled={disabled}>
              <img src={edit} alt="edit-account-button" />
            </button>
          </Link>
          <div>
            <button
              className="remove-account"
              onClick={onRemove}
              disabled={disabled}
            >
              <img src={remove} alt="remove-hoster-button" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
