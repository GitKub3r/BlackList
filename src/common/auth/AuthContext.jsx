import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Import correcto

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decodificando el token
        setIsAuthenticated(true);
        setUsername(decoded.sub); // Utilizando `sub` para el username
      } catch (error) {
        console.error("Error decoding token", error);
        setIsAuthenticated(false);
      }
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setIsAuthenticated(true);
          setUsername(decoded.sub); // Utilizando `sub` para el username
        } catch (error) {
          console.error("Error decoding token", error);
          setIsAuthenticated(false);
          setUsername(null);
        }
      } else {
        setIsAuthenticated(false);
        setUsername(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, username }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
