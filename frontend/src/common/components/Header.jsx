import "../../styles/components/Header.css";
import { Link } from "react-router";
import navlinks from "../json/header/nav-links.json";
import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

export const Header = () => {
  const { username, isAuthenticated } = useAuth();
  const [user, setUser] = useState({});
  const [links, setLinks] = useState(navlinks.unlogged.navLinks); // Default to unlogged navlinks

  const handleUser = async (token, userID) => {
    const response = await fetch(`http://localhost:8080/api/users/${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUser(await response.json());
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && isAuthenticated) {
      setLinks(navlinks.logged.navLinks);
      const userID = jwtDecode(token).sub;

      handleUser(token, userID);
    } else {
      setLinks(navlinks.unlogged.navLinks);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (user.type === "ADMIN") {
      setLinks(navlinks.admin.navLinks);
    }
  }, [user]);

  const [firstItem, ...restItems] = links;

  return (
    <header className="main-header">
      <nav className="main-header-navbar">
        <ul>
          <li className="home-item">
            <Link to={firstItem.url}>
              <img src={`/assets/icons/${firstItem.icon}`} alt="" />
              <h1>{firstItem.name}</h1>
            </Link>
          </li>
          {restItems.map((link, index) => (
            <li key={index}>
              <Link to={link.url} className="hover-link">
                <img src={`/assets/icons/${link.icon}`} alt="" />
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
