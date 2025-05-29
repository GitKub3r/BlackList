import "../../styles/components/Champion-Ban-Pannel.css";
import missing from "../../../public/assets/images/league-missing-ping.webp";
import messages from "../json/bans/error-messages.json";
import { ChampionCard } from "./ChampionCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { useModal } from "../auth/ModalContext";

export const ChampionBanPannel = () => {
  const navigate = useNavigate();
  const [bannedChampions, setBannedChampions] = useState([]);
  const [bans, setBans] = useState([]);
  const [allChampions, setAllChampions] = useState([]);
  const [filteredChampions, setFilteredChampions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const { apiURL, token, user, isAuthenticated } = useAuth();
  const { showModal } = useModal();
  let error = false;

  // Si no está autenticado o no hay usuario, no renderizar nada
  if (!isAuthenticated || !user) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;
    const championNameInput = document.getElementById(
      "add-banned-champion-input"
    );

    handleValidation(championNameInput);

    if (!error) {
      const champion = {
        championName: championNameInput.value,
        userID: user.id,
      };

      const response = await fetch(`${apiURL}/bans`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(champion),
      });

      if (response.status === 404) {
        showModal(messages["not-found"], "error");
        championNameInput.value = "";
      } else if (response.status === 400) {
        showModal(messages.limit, "warning");
        championNameInput.value = "";
      } else if (response.status === 409) {
        showModal(messages.duplicate, "warning");
        championNameInput.value = "";
      } else if (response.status === 500) {
        showModal(messages.unknown, "error");
        championNameInput.value = "";
      } else if (response.status === 200) {
        championNameInput.value = "";
        fetchBans();
        showModal(messages["add-success"], "success");
      }
    }
  };

  const handleValidation = (input) => {
    let nErrors = 0;

    if (input.value === "") {
      nErrors++;
    }

    if (nErrors > 0) {
      error = true;
      showModal(messages.empty, "warning");
    } else {
      error = false;
    }
  };

  const handleDeleteChampion = async (championName) => {
    if (!token) return;

    const champion = {
      championName: championName,
      userID: user.id,
    };

    const response = await fetch(`${apiURL}/bans`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(champion),
    });

    if (response.status === 200) {
      const updatedBans = bans.filter(
        (ban) => ban.championName !== championName
      );
      setBans(updatedBans);
      fetchBans();
      showModal(messages["remove-success"], "success");
    } else {
      showModal("Error deleting champion", "error");
    }
  };

  const fetchBans = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${apiURL}/bans/${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setBans(data);
      }
    } catch (error) {
      showModal(messages["bans-error"], "error");
    }
  };

  const fetchBannedChampions = async (ids = []) => {
    if (!token) return;
    const safeIds = Array.isArray(ids) ? ids : [];
    try {
      const response = await fetch(`${apiURL}/champions/filter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(safeIds),
      });

      const data = await response.json();
      if (response.status === 200) {
        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
        setBannedChampions(sortedData);
      } else {
        showModal("Error fetching banned champions", "error");
      }
    } catch (error) {
      showModal("Error fetching banned champions", "error");
    }
  };

  useEffect(() => {
    const fetchAllChampions = async () => {
      if (!token) return;
      try {
        const response = await fetch(`${apiURL}/champions`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
          setAllChampions(sortedData);
        } else {
          showModal("Error fetching all champions", "error");
        }
      } catch (error) {
        showModal("Error fetching all champions", "error");
      }
    };

    if (token) {
      fetchAllChampions();
    }
  }, [token, apiURL, showModal]);

  const handleClick = () => {
    const names = bannedChampions.map((champion) => champion.name).join(", ");
    const text = "BANNED CHAMPIONS: " + names;

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "absolute";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);

    showModal("Copied to clipboard!", "info");
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    const matches = allChampions.filter((champion) =>
      champion.name.toLowerCase().includes(inputValue)
    );
    setFilteredChampions(matches);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (event) => {
    if (filteredChampions.length > 0) {
      if (event.key === "ArrowDown") {
        setSelectedIndex((prevIndex) => {
          const nextIndex =
            prevIndex < filteredChampions.length - 1
              ? prevIndex + 1
              : prevIndex;
          scrollToItem(nextIndex);
          return nextIndex;
        });
        event.preventDefault();
      } else if (event.key === "ArrowUp") {
        setSelectedIndex((prevIndex) => {
          const nextIndex = prevIndex > 0 ? prevIndex - 1 : prevIndex;
          scrollToItem(nextIndex);
          return nextIndex;
        });
        event.preventDefault();
      } else if (event.key === "Enter") {
        if (selectedIndex >= 0) {
          handleSelectChampion(filteredChampions[selectedIndex].name);
        }
        event.preventDefault();
      } else if (event.key === "Escape") {
        setFilteredChampions([]);
      }
    }
  };

  const scrollToItem = (index) => {
    const list = document.querySelector(".suggestions-list");
    const item = list?.children[index];
    if (item) {
      item.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  };

  const handleSelectChampion = (name) => {
    const input = document.getElementById("add-banned-champion-input");
    input.value = name;
    setFilteredChampions([]);
    setSelectedIndex(-1);
  };

  useEffect(() => {
    if (token) {
      fetchBans();

      const handleClickOutside = (event) => {
        const input = document.getElementById("add-banned-champion-input");
        if (input && !input.contains(event.target)) {
          setFilteredChampions([]);
        }
      };

      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          setFilteredChampions([]);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [token]);

  useEffect(() => {
    const ids = bans.map((ban) => ban.championId);
    fetchBannedChampions(ids);
    // eslint-disable-next-line
  }, [bans]);

  return (
    <div className="champion-ban-pannel">
      <div className="title-section">
        <h1>Banned Champions</h1>
        <hr />
      </div>

      <div className="banned-champions-section">
        <form className="add-champion-section" onSubmit={handleSubmit}>
          <input
            type="text"
            name="add-banned-champion"
            id="add-banned-champion-input"
            placeholder="Add a champion to your ban list"
            autoComplete="off"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          {filteredChampions.length > 0 && (
            <ul className="suggestions-list">
              {filteredChampions.map((champion, index) => (
                <li
                  key={champion.id}
                  className={index === selectedIndex ? "selected" : ""}
                  onClick={() => handleSelectChampion(champion.name)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  {champion.name}
                </li>
              ))}
            </ul>
          )}
          <button className="add-champion-button">Add</button>
        </form>
        {bannedChampions.length === 0 ? (
          <div className="no-champions-found">
            <h1>Oops, no champions were found...</h1>
            <img src={missing} alt="league-of-legeds-missing-ping" />
          </div>
        ) : (
          <>
            <div className="banned-champions">
              {bannedChampions.map((champion) => (
                <ChampionCard
                  key={champion.id}
                  champion={champion}
                  onDelete={() => handleDeleteChampion(champion.name)}
                />
              ))}
            </div>

            <button className="copy-clipboard-button" onClick={handleClick}>
              <span>Copy to clipboard</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 -960"
                width="24px"
                fill="#FFFFFF"
              >
                <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
