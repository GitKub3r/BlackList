import "../../styles/components/Account-Card.css";
import image from "../../../public/assets/images/BlackList-Logo.png";
import edit from "../../../public/assets/icons/hosters.svg";
import remove from "../../../public/assets/icons/delete.svg";
import { useNavigate } from "react-router";
import { Link } from "react-router";
export const AccountCard = ({ user }) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleRemoveAccount = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/users/${user.id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.ok) {
                navigate("/users");
            } else {
                alert("Failed to remove user");
            }
        } catch (error) {
            console.error("Error removing user:", error);
            alert("An error occurred while removing the user");
        }
    };

    return (
        <div className="account-card">
            <img src={image} alt="account-image" className="account-card-img" />

            <div className="account-info-actions">
                <div className="account-info">
                    <h2>{user.username}</h2>
                    <p>{user.type}</p>
                </div>

                <hr />

                <div className="account-actions">
                    <Link to="/update-account">
                        <button className="edit-account">
                            <img src={edit} alt="edit-account-button" />
                        </button>
                    </Link>
                    <div>
                        <button
                            className="remove-account"
                            onClick={handleRemoveAccount}
                        >
                            <img src={remove} alt="remove-hoster-button" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
