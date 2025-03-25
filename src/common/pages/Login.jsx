import "../../styles/pages/Login.css";
import { LoginButton } from "../components/form/LoginButton";
import { LoginInput } from "../components/form/LoginInput";
import { Link } from "react-router";

export const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();

    const username = e.target.username;
    const password = e.target.password;

    handleValidation(username, password);
  };

  const handleValidation = (username, password) => {
    let nErrors = 0;

    if (username.value === "") {
      username.classList.add("error");
      username.previousSibling.classList.add("error");
      username.placeholder = "Please enter a username";

      nErrors++;
    }

    if (password.value === "") {
      password.classList.add("error");
      password.previousSibling.classList.add("error");
      password.placeholder = "Please enter a valid password";

      nErrors++;
    }

    if (nErrors === 0) {
      username.value = "";
      password.value = "";
    }
  };
  return (
    <section className="login-page center-column">
      <form method="POST" className="login-form" onSubmit={handleLogin}>
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
