import "../../styles/pages/Database.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { PlayerCard } from "../components/PlayerCard";
import { BlackListInput } from "../components/BlackListInput";
import messages from "../json/database/error-messages.json";

export const Database = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { isAuthenticated } = useAuth();
    const [players, setPlayers] = useState([]);
    let error = false;

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const search = document.getElementById("blacklist-search-input");

        handleValidation(search);
    };

    const handleValidation = (input) => {
        let nErrors = 0;

        if (input.value === "") {
            error = true;
            nErrors++;
        }

        if (nErrors > 0) {
            showError(input, messages.empty.search);
        }
    };

    const showError = (input, message) => {
        input.classList.add("error");
        input.previousSibling.classList.add("error");
        input.placeholder = message;
        input.value = "";
    };

    return (
        <div className="database-page">
            <form className="blacklist-container" onSubmit={handleSubmit}>
                <BlackListInput
                    label="Search for a player"
                    type="text"
                    name="blacklist-search"
                    id="blacklist-search-input"
                />
                {players.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                ))}
            </form>
        </div>
    );
};
