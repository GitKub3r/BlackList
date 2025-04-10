import { useEffect, useState } from "react";
import "../../styles/layouts/Champion-Layout.css";
import missing from "../../../public/assets/images/league-missing-ping.webp";
import { ChampionCard } from "../components/ChampionCard";

export const ChampionLayout = ({ champions }) => {
    const [currentChampions, setCurrentChampions] = useState([]);

    useEffect(() => {
        setCurrentChampions(champions);
    }, [champions]);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/champions/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.ok) {
                setCurrentChampions(
                    currentChampions.filter((champion) => champion.id !== id)
                );
            } else {
                alert("Failed to delete champion");
            }
        } catch (error) {
            console.error("Error deleting champion:", error);
            alert("An error occurred while deleting the champion");
        }
    };

    return (
        <div className="champion-layout">
            {champions.length === 0 ? (
                <div className="no-champions-found">
                    <h1>Oops, no champions were found...</h1>
                    <img src={missing} alt="league-of-legeds-missing-ping" />
                </div>
            ) : (
                currentChampions.map((champion, index) => (
                    <ChampionCard
                        key={index}
                        champion={champion}
                        onDelete={() => handleDelete(champion.id)}
                    />
                ))
            )}
        </div>
    );
};
