import "../../styles/pages/Database.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { PlayerCard } from "../components/PlayerCard";
import { BlackListInput } from "../components/BlackListInput";
import messages from "../json/database/error-messages.json";

export const Database = () => {
  const navigate = useNavigate();
  const { isAuthenticated, token, apiURL } = useAuth();
  const [players, setPlayers] = useState([]);
  let error = false;

  useEffect(() => {
    const cleanExpiredPlayers = async () => {
      if (isAuthenticated && token) {
        await fetch(`${apiURL}/players/clean-expired`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    };

    const fetchPlayers = async () => {
      if (isAuthenticated && token) {
        const response = await fetch(`${apiURL}/players`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched players:", data); // Debugging line

          setPlayers(data);
        } else {
          // Maneja el error, por ejemplo:
          setPlayers([]);
          showModal("No players found or error fetching players", "error");
        }
      } else {
        navigate("/login");
      }
    };

    cleanExpiredPlayers().then(fetchPlayers);
  }, [isAuthenticated, token, apiURL, navigate]);

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
      <div className="blacklist-container" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search-banned-players"
          id="search-banned-players-input"
          placeholder="Add a champion to your ban list"
          autoComplete="off"
        />

        <Link to="/players/create" className="add-player-link">
          <button>Add a Player</button>
        </Link>
      </div>

      <div className="blacklist">
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            onDelete={(id) =>
              setPlayers((prev) => prev.filter((p) => p.id !== id))
            }
          />
        ))}
      </div>
    </div>
  );
};
