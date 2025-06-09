import { createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router";
import { useModal } from "./ModalContext";
import messages from "../json/login/error-messages.json";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiURL = import.meta.env.VITE_APP_API_URL;
  const navigate = useNavigate();

  const { showModal } = useModal();

  // Cargar usuario si hay token
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const response = await fetch(`${apiURL}/users/${decoded.sub}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const userData = await response.json();

          if (response.ok) {
            setUser(userData);
            setIsAuthenticated(true);
          }
        } catch (error) {
          setIsAuthenticated(false);
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    };
    setLoading(true);
    fetchUser();
  }, [token]);

  // Login function
  const login = async (username, password) => {
    const response = await fetch(`${apiURL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/");
      showModal(messages.success + username, "success");
    } else {
      showModal(messages.invalid, "error");
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        loading,
        login,
        logout,
        apiURL,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
