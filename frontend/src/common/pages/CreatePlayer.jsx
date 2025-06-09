import "../../styles/pages/Create-Player.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import { useModal } from "../auth/ModalContext";
import { LoginInput } from "../components/form/LoginInput";

export const CreatePlayer = () => {
  const navigate = useNavigate();
  const { apiURL, user, token } = useAuth();
  const { showModal } = useModal();

  const [username, setUsername] = useState("");
  const [tag, setTag] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [permanent, setPermanent] = useState(false);

  const DESCRIPTION_MAX = 50;
  const [validationMessage, setValidationMessage] = useState(
    "Username, tag and date are required."
  );

  const handleDescriptionChange = (value) => {
    if (value.length <= DESCRIPTION_MAX) {
      setDescription(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !tag.trim()) {
      showModal(validationMessage, "warning");
      return;
    }

    // Validar fecha
    if (!permanent) {
      if (!duration) {
        showModal("You must select a ban end date.", "warning");
        return;
      }
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Ignorar hora
      const selectedDate = new Date(duration);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        showModal("You cannot select a date prior to today.", "warning");
        return;
      }
    }

    const playerObj = {
      username,
      tag,
      description,
      duration: permanent ? null : duration,
      permanent,
      hosterUsername: user.username,
    };

    try {
      const response = await fetch(`${apiURL}/players`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(playerObj),
      });

      if (response.ok) {
        showModal("Player created successfully", "success");
        navigate("/database");
      } else {
        let msg = "Error creating player";
        try {
          const data = await response.json();
          if (data && data.message) msg = data.message;
        } catch {}
        showModal(msg, "error");
      }
    } catch (error) {
      showModal("Error creating player", "error");
    }
  };

  return (
    <div className="create-player-page">
      <form onSubmit={handleSubmit} className="create-player-form">
        <div className="create-player-text-container">
          <h1>Add Player</h1>
          <hr />
        </div>
        <div className="create-player-inputs-container">
          <LoginInput
            label="Username"
            type="text"
            name="player-username"
            id="player-username-input"
            value={username}
            handleChange={setUsername}
            required
          />
          <LoginInput
            label="Tag"
            type="text"
            name="player-tag"
            id="player-tag-input"
            value={tag}
            handleChange={setTag}
            required
          />
          <div className="create-player-description-container">
            <div className="create-player-description-label-row">
              <label
                htmlFor="player-description-input"
                className="create-player-description-label"
              >
                Description
              </label>
              <span className="create-player-description-remaining">
                ({DESCRIPTION_MAX - description.length} left)
              </span>
            </div>
            <input
              type="text"
              name="player-description"
              id="player-description-input"
              className="create-player-description-input"
              value={description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              maxLength={DESCRIPTION_MAX}
              autoComplete="off"
            />
          </div>
          <LoginInput
            label="Ban until"
            type="date"
            name="player-duration"
            id="player-duration-input"
            value={permanent ? "" : duration}
            handleChange={setDuration}
            disabled={permanent}
            required={!permanent}
          />

          <div className="create-player-permanent-container">
            <label
              htmlFor="player-permanent-checkbox"
              className="permanent-label"
            >
              Permanent
              <span className="custom-checkbox-wrapper">
                <input
                  type="checkbox"
                  id="player-permanent-checkbox"
                  checked={permanent}
                  onChange={(e) => {
                    setPermanent(e.target.checked);
                    setValidationMessage("Username and tag are required.");
                  }}
                  className="custom-checkbox"
                />
                <span className="custom-checkbox-indicator"></span>
              </span>
            </label>
          </div>
        </div>
        <button>Add Player</button>
      </form>
    </div>
  );
};
