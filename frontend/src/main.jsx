import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router";
import App from "./App.jsx";
import "./styles/index.css";
import { AuthProvider } from "./common/auth/AuthContext.jsx";
import { ModalProvider } from "./common/auth/ModalContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <ModalProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ModalProvider>
    </Router>
  </StrictMode>
);
