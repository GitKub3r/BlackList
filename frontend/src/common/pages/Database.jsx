import "../../styles/pages/Database.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { PlayerCard } from "../components/PlayerCard";
import { BlackListInput } from "../components/BlackListInput";

export const Database = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { isAuthenticated } = useAuth();
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            if (token) {
                const response = await fetch(
                    "http://localhost:8080/api/players",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        method: "GET",
                    }
                );

                const data = await response.json();

                if (response.status == 404) {
                    console.error("Error fetching players:", data);
                } else if (response.ok) {
                    setPlayers(data);
                }
            } else {
                navigate("/login");
            }
        };

        fetchPlayers();
    }, [isAuthenticated]);

    return (
        <div className="database-page">
            <div className="blacklist-container">
                <BlackListInput
                    label="Username"
                    type="text"
                    name="username-blacklist"
                    id="username-blacklist-input"
                />
                {players.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                ))}
            </div>
        </div>
    );
};
