import "../../styles/pages/Champs.css";
import { LoginInput } from "../components/form/LoginInput";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ChampionLayout } from "../layouts/ChampionsLayout";
import { useAuth } from "../auth/AuthContext";
import messages from "../json/champions/messages.json";
import { useModal } from "../auth/ModalContext";
import { ConfirmModal } from "../components/ConfirmModal";

export const Champs = () => {
  const navigate = useNavigate();
  const { isAuthenticated, token, apiURL, user } = useAuth();
  const { showModal } = useModal();
  const [champions, setChampions] = useState([]);
  const [allData, setAllData] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [championToRemove, setChampionToRemove] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate("/login");
      return;
    }

    const fetchChampions = async () => {
      try {
        const response = await fetch(`${apiURL}/champions`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
          setAllData(sortedData);
          setChampions(sortedData);
        }
      } catch (error) {
        showModal(messages.error, "error");
      }
    };

    fetchChampions();
  }, [isAuthenticated, token, apiURL, navigate, showModal]);

  useEffect(() => {
    // Solo permitir admins
    if (user && user.type !== "ADMIN") {
      navigate("/");
    }
  }, [user, navigate]);

  // Maneja el submit SOLO para añadir
  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("champion-name-input");
    let error = false;

    if (!nameInput.value.trim()) {
      showModal(messages.empty, "error");
      error = true;
    }

    if (!error) {
      try {
        const response = await fetch(
          `${apiURL}/champions/${encodeURIComponent(nameInput.value)}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 400) {
          showModal(messages.duplicate, "error");
        } else if (response.ok) {
          let newChampion = null;
          try {
            newChampion = await response.json();
          } catch {}
          if (newChampion && newChampion.id) {
            const updated = [...champions, newChampion].sort((a, b) =>
              a.name.localeCompare(b.name)
            );
            setChampions(updated);
            setAllData(updated);
          } else {
            // Si no devuelve el objeto, fuerza refetch
            const res = await fetch(`${apiURL}/champions`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
            if (res.ok) {
              const data = await res.json();
              const sortedData = data.sort((a, b) =>
                a.name.localeCompare(b.name)
              );
              setAllData(sortedData);
              setChampions(sortedData);
            }
          }
          nameInput.value = "";
          showModal(messages.success, "success");
        } else {
          let msg = messages.error;
          try {
            const data = await response.json();
            if (data && data.message) msg = data.message;
          } catch {}
          showModal(msg, "error");
        }
      } catch (error) {
        showModal(messages.error, "error");
      }
    }
  };

  // Maneja la búsqueda y filtra en tiempo real
  const handleSearch = (value) => {
    setSearchValue(value);
    const filteredChampions = allData.filter((champion) =>
      champion.name.toLowerCase().includes(value.toLowerCase())
    );
    setChampions(filteredChampions);
  };

  const handleAskRemove = (champion) => {
    setChampionToRemove(champion);
    setConfirmOpen(true);
  };

  const handleConfirmResult = async (result) => {
    setConfirmOpen(false);
    if (result && championToRemove) {
      try {
        const response = await fetch(
          `${apiURL}/champions/${championToRemove.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          setChampions((prev) =>
            prev.filter((c) => c.id !== championToRemove.id)
          );
          setAllData((prev) =>
            prev.filter((c) => c.id !== championToRemove.id)
          );
          showModal(
            messages["remove-success"] || "Champion removed successfully",
            "success"
          );
        } else {
          let msg = messages.error;
          try {
            const data = await response.json();
            if (data && data.message) msg = data.message;
          } catch {}
          showModal(msg || "Failed to remove champion", "error");
        }
      } catch (error) {
        showModal(
          messages.error || "An error occurred while removing the champion",
          "error"
        );
      }
      setChampionToRemove(null);
    } else {
      setChampionToRemove(null);
    }
  };

  if (!isAuthenticated || !token || !user) {
    return null;
  }

  return (
    <div className="champs-page">
      <ConfirmModal
        open={confirmOpen}
        title="Delete champion"
        description={`Are you sure you want to delete "${championToRemove?.name}"? This action cannot be undone.`}
        onResult={handleConfirmResult}
        confirmText="Continue"
        cancelText="Cancel"
      />
      <div className="champs-content">
        <form onSubmit={handleSubmit} className="champions-form">
          <div className="champions-form-inputs">
            <LoginInput
              label="Search Champion"
              type="text"
              name="champion-search"
              id="champion-search-input"
              value={searchValue}
              autoComplete={false}
              handleChange={handleSearch}
            />
            <LoginInput
              label="Add Champion"
              type="text"
              name="champion-name"
              id="champion-name-input"
              autoComplete={false}
              focus={true}
            />
          </div>
          <button type="submit" className="champions-form-button">
            Add Champion
          </button>
        </form>
        <ChampionLayout
          champions={champions}
          onRemoveChampion={handleAskRemove}
        />
      </div>
    </div>
  );
};
