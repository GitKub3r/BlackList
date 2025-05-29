import "../../styles/pages/Login.css";
import { LoginButton } from "../components/form/LoginButton";
import { LoginInput } from "../components/form/LoginInput";
import { Link } from "react-router";
import { useAuth } from "../auth/AuthContext";
import messages from "../json/login/error-messages.json";
import { useModal } from "../auth/ModalContext";

export const Login = () => {
  const { login } = useAuth();
  const { showModal } = useModal();
  let error = false;

  const handleLogin = async (e) => {
    e.preventDefault();

    const username = document.getElementById("username-input");
    const password = document.getElementById("password-input");

    handleValidation(username, password);

    if (!error) {
      await login(username.value, password.value);
      // El modal de error se muestra desde AuthContext si el login falla
    }
  };

  const handleValidation = (username, password) => {
    let nErrors = 0;

    if (username.value === "") {
      nErrors++;
    }

    if (password.value === "") {
      nErrors++;
    }

    if (nErrors > 0) {
      showModal(messages.empty, "warning");
      error = true;
    } else {
      error = false;
    }
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
          Don't have a <b>hoster account</b>? Check our{" "}
          <Link to="/about">about</Link> page
        </span>

        <LoginButton />
      </form>
    </section>
  );
};
