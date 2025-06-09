import "../../styles/pages/Database.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { PlayerCard } from "../components/PlayerCard";
import messages from "../json/database/error-messages.json";

import missing from "../../../public/assets/images/league-missing-ping.webp";

export const Database = () => {
  const navigate = useNavigate();
  const { isAuthenticated, token, apiURL } = useAuth();
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState(""); // Estado para búsqueda
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
          setPlayers(data);
        } else {
          setPlayers([]);
          // showModal("No players found or error fetching players", "error");
        }
      } else {
        navigate("/login");
      }
    };

    cleanExpiredPlayers().then(fetchPlayers);
  }, [isAuthenticated, token, apiURL, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchInput = document.getElementById("search-banned-players-input");
    handleValidation(searchInput);
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

  // Filtrado de jugadores según búsqueda
  const filteredPlayers = players.filter(
    (player) =>
      player.username.toLowerCase().includes(search.toLowerCase()) ||
      player.tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="database-page">
      <div className="blacklist-container" onSubmit={handleSubmit}>
        <input
          type="text"
          name="search-banned-players"
          id="search-banned-players-input"
          placeholder="Add a champion to your ban list"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Link to="/players/create" className="add-player-link">
          <button>Add a Player</button>
        </Link>
      </div>

      <div className="blacklist">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onDelete={(id) =>
                setPlayers((prev) => prev.filter((p) => p.id !== id))
              }
            />
          ))
        ) : (
          <div className="no-champions-found">
            <h1>Oops, no players were found...</h1>
            <img src={missing} alt="league-of-legeds-missing-ping" />
          </div>
        )}
      </div>
    </div>
  );
};
