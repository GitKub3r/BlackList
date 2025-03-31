import "../../styles/pages/Champs.css";
import { LoginInput } from "../components/form/LoginInput";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { ChampionLayout } from "../layouts/ChampionsLayout";
import { useAuth } from "../auth/AuthContext";
import messages from "../json/champions/error-messages.json";

export const Champs = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [champions, setChampions] = useState([]);
  let error = false;

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetch("http://localhost:8080/api/champions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setChampions(data);
        });
    } else {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = document.getElementById("champion-name-input");

    handleValidation(name);

    if (!error) {
      fetch(`http://localhost:8080/api/champions/${name.value}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (response.status === 400) {
          showError(name, messages.duplicate);
        } else if (response.ok) {
          setChampions([...champions, name.value]);
          name.value = "";
          window.location.reload();
        }
      });
    }
  };

  const handleValidation = (input) => {
    let nErrors = 0;

    if (input.value === "") {
      showError(input, messages.empty);
      nErrors++;
    }

    if (nErrors > 0) {
      error = true;
    }
  };

  const showError = (input, message) => {
    input.classList.add("error");
    input.previousSibling.classList.add("error");
    input.placeholder = message;
    input.value = "";
  };

  return (
    <div className="champs-page">
      <form onSubmit={handleSubmit}>
        <LoginInput
          label="Champion Name"
          type="text"
          name="champion-name"
          id="champion-name-input"
          focus={true}
        />

        <button>Add Champion</button>
      </form>

      <hr />

      <ChampionLayout champions={champions} />
    </div>
  );
};
