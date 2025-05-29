import "../../styles/components/Champion-Card.css";
import ChampionIamge from "../../../public/assets/icons/champions-black.svg";
import Remove from "../../../public/assets/icons/delete.svg";

export const ChampionCard = ({ champion, onDelete }) => {
  return (
    <div className="champion-card">
      <div className="champion-card-content">
        <img src={ChampionIamge} alt="champion-image" />
        <div className="pseudo" />
        <h2>{champion.name}</h2>
      </div>

      <div className="champion-button-content">
        <button onClick={onDelete}>
          <img src={Remove} alt="delete" />
        </button>
      </div>
    </div>
  );
};
