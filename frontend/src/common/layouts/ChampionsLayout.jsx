import { useEffect, useState } from "react";
import "../../styles/layouts/Champion-Layout.css";
import { ChampionCard } from "../components/ChampionCard";

export const ChampionLayout = ({ champions }) => {
  const [currentChampions, setCurrentChampions] = useState([]);

  useEffect(() => {
    setCurrentChampions(champions);
  }, [champions]);

  const handleDelete = (id) => {
    setCurrentChampions(
      currentChampions.filter((champion) => champion.id !== id)
    );
  };

  return (
    <div className="champion-layout">
      {currentChampions.map((champion, index) => (
        <ChampionCard key={index} champion={champion} onDelete={handleDelete} />
      ))}
    </div>
  );
};
