import "../../styles/pages/Login.css";
import { LoginButton } from "../components/form/LoginButton";
import { LoginInput } from "../components/form/LoginInput";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../auth/AuthContext";
import messages from "../json/login/error-messages.json";

export const Login = ({ handleHeader }) => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  let error = false;

  const handleLogin = async (e) => {
    e.preventDefault();

    const username = document.getElementById("username-input");
    const password = document.getElementById("password-input");

    handleValidation(username, password);

    if (!error) {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
        navigate("/");
      } else {
        showError(username, messages.invalid.username);
        showError(password, messages.invalid.password);
      }
    }
  };

  const handleValidation = (username, password) => {
    let nErrors = 0;

    if (username.value === "") {
      nErrors++;
      showError(username, messages.empty.username);
    }

    if (password.value === "") {
      nErrors++;
      showError(password, messages.empty.password);
    }

    error = nErrors > 0;
  };

  const showError = (input, message) => {
    input.classList.add("error");
    input.previousSibling.classList.add("error");
    input.placeholder = message;
    input.value = "";
  };

  return (
    <section className="login-page center-column">
      <form className="login-form" onSubmit={handleLogin}>
        <LoginInput
          label="Username"
          type="text"
          name="username"
          id="username-input"
        />

        <LoginInput
          label="Password"
          type="password"
          name="password"
          id="password-input"
        />

        <span className="login-page-info">
          Don't have a <b>hoster account</b>? Check our <Link>about</Link> page
        </span>

        <LoginButton />
      </form>
    </section>
  );
};
