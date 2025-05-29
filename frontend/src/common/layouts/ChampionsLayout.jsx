import "../../styles/layouts/Champion-Layout.css";
import missing from "../../../public/assets/images/league-missing-ping.webp";
import { ChampionCard } from "../components/ChampionCard";

export const ChampionLayout = ({ champions, onRemoveChampion }) => {
  return (
    <div className="champion-layout">
      {champions.length === 0 ? (
        <div className="no-champions-found">
          <h1>Oops, no champions were found...</h1>
          <img src={missing} alt="league-of-legeds-missing-ping" />
        </div>
      ) : (
        champions.map((champion) => (
          <ChampionCard
            key={champion.id || champion.name}
            champion={champion}
            onDelete={() => onRemoveChampion && onRemoveChampion(champion)}
          />
        ))
      )}
    </div>
  );
};
