import "../../styles/components/Champion-Ban-Pannel.css";
import missing from "../../../public/assets/images/league-missing-ping.webp";
import { ChampionCard } from "./ChampionCard";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import jwtDecode from "jwt-decode";
import { InfoModal } from "./modals/InfoModal";
import { ErrorModal } from "./modals/ErrorModal";
import { WarningModal } from "./modals/WarningModal";
import { SuccessModal } from "./modals/SuccessModal";

export const ChampionBanPannel = () => {
    const navigate = useNavigate();
    const [bannedChampions, setBannedChampions] = useState([]);
    const [bans, setBans] = useState([]);
    const token = localStorage.getItem("token");
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const handleSubmit = async (e) => {
        const userID = jwtDecode(token).sub;
        e.preventDefault();

        const championNameInput = document.getElementById(
            "add-banned-champion-input"
        );

        const champion = {
            championName: championNameInput.value,
            userID: userID,
        };

        const response = await fetch("http://localhost:8080/api/bans", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(champion),
        });

        if (response.status === 404) {
            championNameInput.placeholder = "Champion not found";
            championNameInput.value = "";
            championNameInput.classList.add("error");
        } else if (response.status === 400) {
        } else {
            championNameInput.value = "";
            window.location.reload();
        }
    };

    const handleDeleteChampion = async (championName) => {
        const userID = jwtDecode(token).sub;
        const champion = {
            championName: championName,
            userID: Number(userID),
        };

        const response = await fetch("http://localhost:8080/api/bans", {
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
            window.location.reload();
        } else {
            console.error("Error deleting champion:", response.statusText);
        }
    };

    const fetchBans = async () => {
        const userID = jwtDecode(token).sub;
        const response = await fetch(
            `http://localhost:8080/api/bans/${userID}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status === 200) {
            const data = await response.json();
            setBans(data);
        }
    };

    const fetchBannedChampions = async (ids) => {
        const response = await fetch(
            "http://localhost:8080/api/champions/filter",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(ids),
            }
        );

        const data = await response.json();
        if (response.status === 200) {
            const sortedData = data.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            setBannedChampions(sortedData);
        } else {
            console.error("Error fetching banned champions:", data);
        }
    };

    const handleClick = () => {
        const names = bannedChampions
            .map((champion) => champion.name)
            .join(", ");
        const text = "BANNED CHAMPIONS: " + names;

        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "absolute";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);

        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);

        setShowModal(false); // Reset modal visibility
        setTimeout(() => {
            setModalMessage("Copied to clipboard!");
            setShowModal(true);
        }, 0); // Ensure the modal re-renders
    };

    useEffect(() => {
        if (token) {
            fetchBans();
        } else {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        const ids = bans.map((ban) => ban.championId);
        fetchBannedChampions(ids);
    }, [bans]);

    return (
        <div className="champion-ban-pannel">
            {showModal && <InfoModal message={modalMessage} />}
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
                        onFocus={(e) => e.target.classList.remove("error")}
                    />

                    <button className="add-champion-button">Add</button>
                </form>
                {bannedChampions.length === 0 ? (
                    <div className="no-champions-found">
                        <h1>Oops, no champions were found...</h1>
                        <img
                            src={missing}
                            alt="league-of-legeds-missing-ping"
                        />
                    </div>
                ) : (
                    <>
                        <div className="banned-champions">
                            {bannedChampions.map((champion) => (
                                <ChampionCard
                                    key={champion.id}
                                    champion={champion}
                                    onDelete={() =>
                                        handleDeleteChampion(champion.name)
                                    }
                                />
                            ))}
                        </div>

                        <button
                            className="copy-clipboard-button"
                            onClick={handleClick}
                        >
                            <span>Copy to clipboard</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
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
