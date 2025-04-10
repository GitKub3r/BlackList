import "../../styles/pages/Champs.css";
import { LoginInput } from "../components/form/LoginInput";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ChampionLayout } from "../layouts/ChampionsLayout";
import { useAuth } from "../auth/AuthContext";
import messages from "../json/champions/error-messages.json";
import jwtDecode from "jwt-decode";
import { ErrorModal } from "../components/modals/ErrorModal";

export const Champs = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [champions, setChampions] = useState([]);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    let error = false;

    const token = localStorage.getItem("token");
    const userID = token ? jwtDecode(token).sub : null;

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
                    const sortedData = data.sort((a, b) =>
                        a.name.localeCompare(b.name)
                    );
                    setChampions(sortedData);
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
                    showError(messages.duplicate);
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
            nErrors++;
        }

        if (nErrors > 0) {
            showError(messages.empty);
            error = true;
        }
    };

    const showError = (message) => {
        setErrorMessage(message);
        setShowErrorModal(false);
        setTimeout(() => {
            setShowErrorModal(true);
        }, 10);
    };

    const checkUserType = async () => {
        const response = await fetch(
            `http://localhost:8080/api/users/${userID}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: "GET",
            }
        );

        const data = await response.json();

        if (response.status === 404) {
            console.error("Error fetching user type:", data);
        } else if (response.ok) {
            if (data.type !== "ADMIN") {
                navigate("/");
            }
        }
    };

    checkUserType();

    return (
        <div className="champs-page">
            {showErrorModal && <ErrorModal message={errorMessage} />}
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
