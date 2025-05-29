import "../../styles/components/Player-Card.css";
import remove from "../../../public/assets/icons/delete.svg";
import edit from "../../../public/assets/icons/hosters.svg";
import { useAuth } from "../auth/AuthContext";
import { useModal } from "../auth/ModalContext";
import { useState } from "react";
import { ConfirmModal } from "./ConfirmModal";

export const PlayerCard = ({ player, onDelete }) => {
  const { apiURL, token } = useAuth();
  const { showModal } = useModal();
  const [showConfirm, setShowConfirm] = useState(false);

  const calculateRemainingDays = (duration, permanent) => {
    if (permanent) {
      return "PERMA BANNED";
    }
    const currentDate = new Date();
    const banEndDate = new Date(duration);
    const diffTime = banEndDate - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 1) {
      return `${diffDays} days remaining`;
    } else if (diffDays === 1) {
      return "1 day remaining";
    } else {
      return "UNBANNED";
    }
  };

  const remainingDays = calculateRemainingDays(
    player.duration,
    player.permanent
  );

  const handleDelete = async () => {
    try {
      const response = await fetch(`${apiURL}/players/${player.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        showModal("Player deleted successfully", "success");
        if (onDelete) onDelete(player.id);
      } else {
        let msg = "Error deleting player";
        try {
          const data = await response.json();
          if (data && data.message) msg = data.message;
        } catch {}
        showModal(msg, "error");
      }
    } catch (error) {
      showModal("Error deleting player", "error");
    }
  };

  const handleConfirmResult = (result) => {
    setShowConfirm(false);
    if (result) handleDelete();
  };

  return (
    <div className="player-card">
      <div className="player-name">
        <h3>{player.username}</h3>
        <p>#{player.tag}</p>
      </div>
      <div className="player-ban-info">
        <div className="player-ban-box">
          <div>
            <img src="assets/icons/description.svg" alt="Ban Description" />
            <h3>Reason</h3>
          </div>
          <hr />
          <p>{player.description || "Not specified"}</p>
        </div>
        <div className="player-ban-box">
          <div>
            <img src="assets/icons/clock.svg" alt="Time Remaining" />
            <h3>Time Remaining</h3>
          </div>
          <hr />
          <p>{remainingDays}</p>
        </div>
        <div className="player-ban-box">
          <div>
            <img src="assets/icons/user.svg" alt="Ban Description" />
            <h3>Banned By</h3>
          </div>
          <hr />
          <p>{player.hoster.username}</p>
        </div>
        <button
          className="remove-player-button"
          onClick={() => setShowConfirm(true)}
        >
          <img src={remove} alt="Remove Player Button" />
        </button>
      </div>
      <ConfirmModal
        open={showConfirm}
        title="Delete player"
        description="Are you sure you want to delete this player? This action cannot be undone."
        onResult={handleConfirmResult}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};
