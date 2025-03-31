import "../../styles/components/Player-Card.css";
import remove from "../../../public/assets/icons/delete.svg";
import edit from "../../../public/assets/icons/hosters.svg";

export const PlayerCard = ({ player }) => {
  console.log("PlayerCard", player);

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

  return (
    <div className="player-card">
      <div className="player-name">
        <h3>{player.username}</h3>
        <p>{player.tag}</p>
      </div>

      <div className="player-ban-info">
        <p>{player.description}</p>
        <p>{player.hoster.username}</p>
        <p>{remainingDays}</p>
      </div>

      <div className="player-commands">
        <button className="edit-player-button">
          <img src={edit} alt="Edit Player Button" />
        </button>
        <button className="remove-player-button">
          <img src={remove} alt="Remove Player Button" />
        </button>
      </div>
    </div>
  );
};
